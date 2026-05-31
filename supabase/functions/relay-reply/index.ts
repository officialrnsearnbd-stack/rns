// relay-reply: Miaoda-এর পক্ষ থেকে user-কে reply পাঠায় (service role ব্যবহার করে)
import { createClient } from 'npm:@supabase/supabase-js@2';

const MIAODA_ID = 'ce2f1c5f-d801-408c-9e0e-8ecf584b020d';
const ADMIN_ID  = 'b519a16b-ad63-4b1e-92bf-fee8c11ef33b';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // Caller auth check — শুধু admin পারবে
    const authHeader = req.headers.get('Authorization') ?? '';
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: authErr } = await userClient.auth.getUser();
    if (authErr || !user || user.id !== ADMIN_ID) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { receiver_id, content, reply_to_id, reply_to_content, reply_to_sender_username } = await req.json();

    if (!receiver_id || !content?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing receiver_id or content' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Service role দিয়ে Miaoda হিসেবে message insert করা
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const payload: Record<string, any> = {
      sender_id:   MIAODA_ID,
      receiver_id: receiver_id,
      content:     content.trim(),
      is_seen:     false,
    };
    if (reply_to_id)                payload.reply_to_id                = reply_to_id;
    if (reply_to_content)           payload.reply_to_content           = reply_to_content;
    if (reply_to_sender_username)   payload.reply_to_sender_username   = reply_to_sender_username;

    const { data, error } = await serviceClient.from('messages').insert(payload).select().single();
    if (error) throw error;

    return new Response(JSON.stringify({ success: true, message: data }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message ?? 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
