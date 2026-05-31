
-- 22 posts from demo users with real Unsplash images
INSERT INTO public.posts (id, owner_id, image_url, caption, post_type, privacy, is_draft, created_at)
SELECT
  gen_random_uuid(),
  p.id,
  post.image_url,
  post.caption,
  'photo'::post_type,
  'public'::post_privacy,
  false,
  post.created_at
FROM (VALUES
  ('arif_ctg',        'https://images.unsplash.com/photo-1540747913346-19378d67a04c?w=800&fit=crop',    'Cricket practice today 🏏 আজকে অনেক ভালো প্র্যাকটিস হলো! #cricket #Bangladesh',                 now()-interval'2 hours'),
  ('sabbir_dev',      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&fit=crop',    'Late night coding session ☕💻 কোডিং ছাড়া জীবন অর্থহীন lol',                                    now()-interval'5 hours'),
  ('riya_traveler',   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop',    'Cox''s Bazar ❤️ এই সমুদ্র দেখলে মনে হয় সব কষ্ট দূর হয়ে যায়',                                 now()-interval'1 day'),
  ('tania_arts',      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&fit=crop',    'আজকের আঁকা 🎨 Still practicing watercolor. Slowly getting better!',                             now()-interval'3 hours'),
  ('sadia_chef',      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&fit=crop',    'আজকের রান্না — বিরিয়ানি 🍛 মায়ের রেসিপিতে। Recipe in comments!',                               now()-interval'6 hours'),
  ('jihad_football',  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&fit=crop',    'Sunday match with the boys ⚽ আমরা জিতছি 3-1! #football #chittagong',                           now()-interval'8 hours'),
  ('nusrat_jahan',    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&fit=crop',    'Today''s outfit 💕 কেউ বলো কেমন দেখাচ্ছে? #fashion #ootd',                                     now()-interval'4 hours'),
  ('meghna_reads',    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&fit=crop',    'Currently reading 📚 Humayun Ahmed — Misir Ali series. রাত ৩টায়ও পড়া থামছে না!',              now()-interval'12 hours'),
  ('farhan_music',    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&fit=crop',    'New chord practice 🎸 সারাদিন গিটার ধরে বসে আছি। #guitar #music',                             now()-interval'7 hours'),
  ('rakib_fitness',   'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&fit=crop',    'Leg day done 💪 Pain is temporary, gains are forever! #gym #fitness',                           now()-interval'9 hours'),
  ('prity_dance',     'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&fit=crop',    'Rehearsal for the big show 💃 Next month আমাদের performance আছে! Excited!',                    now()-interval'2 days'),
  ('nasim_coder',     'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&fit=crop',      'Open source contribution today 🔥 একটা bug fix করলাম যেটা ৬ মাস ধরে ছিল lol',              now()-interval'1 day'),
  ('suma_fashion',    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&fit=crop',    'Modest & stylish 🌸 আলহামদুলিল্লাহ. Confidence comes from inside! #modestfashion',            now()-interval'3 days'),
  ('jannatul_ferdous','https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&fit=crop',    'My students today 📖 They drew these for Teachers Day! আমি কাঁদতে কাঁদতে শেষ 😭❤️',           now()-interval'2 days'),
  ('mahfuz_biz',      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&fit=crop',    'Team meeting done ✅ বড় একটা deal close করলাম আজকে! Alhamdulillah 🙏 #startup',              now()-interval'1 day'),
  ('abir_bike',       'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop',      'Sunset ride 🏍️ Chittagong থেকে Cox''s Bazar যাচ্ছি একা। Best feeling ever!',                now()-interval'4 days'),
  ('rashed_cricket',  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&fit=crop',    'Bangladesh vs Pakistan match আজকে 🏏 Tigers জিতবেই ইনশাল্লাহ! #BCB',                       now()-interval'5 hours'),
  ('rubel_fisher',    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&fit=crop',    'ভোরবেলার মাছ ধরা 🎣 নদীর পাশে এই শান্তি টাউনে পাওয়া যাবে না',                               now()-interval'3 days'),
  ('monir_reader',    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop',    'বই মেলায় আজকে অনেক বই কিনলাম 📚 ব্যাংক ব্যালেন্স শেষ কিন্তু মন ভালো 😂',                   now()-interval'5 days'),
  ('tuhin_travel',    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&fit=crop',    'Sundarbans trip 🌿 বাংলাদেশের সৌন্দর্য অতুলনীয়। #travel #sundarbans',                        now()-interval'6 days'),
  ('rina_journalist', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&fit=crop',    'Behind the camera today 📸 সত্য বলা আমার কাজ। Journalism is a calling! #press',             now()-interval'1 day'),
  ('lima_student',    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&fit=crop',    'Study mode on 📓 HSC পরীক্ষার আগে শেষ প্রস্তুতি। Pray for me! 🙏',                          now()-interval'10 hours')
) AS post(username, image_url, caption, created_at)
JOIN public.profiles p ON p.username = post.username;
