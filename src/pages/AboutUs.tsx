import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Heart, Users, Zap, Star, Code2, Globe, Shield, TrendingUp, MessageCircle, Film, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/hooks/use-language';

const RAHAT_AVATAR = 'https://pmopriymftdnyjbugdut.supabase.co/storage/v1/object/public/images/b519a16b-ad63-4b1e-92bf-fee8c11ef33b/avatar_1778760711186.jpg';
const MIAODA_AVATAR = 'https://miaoda-conversation-file.s3cdn.medo.dev/user-bmpss96qza4g/app-bmsn9h7bxxq9/20260528/176526-e08af4b9-98c7-4b40-9af1-71e10c080c14.jpg';
const CHITTAGONG_IMG = 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_6010111f-9ee9-4c99-a17d-bfd896f2ea86.jpg';

export default function AboutUs() {
  const navigate = useNavigate();
  const { lang, toggle, t } = useLanguage();

  const TIMELINE = [
    {
      version: 'v1',
      date: t('January 2025', 'জানুয়ারি ২০২৫'),
      title: t('RNS is Born', 'RNS-এর জন্ম'),
      desc: t(
        'Rahat started with a dream — to build a real social platform from Bangladesh. First lines of code written, first page created.',
        'Rahat একটি স্বপ্ন নিয়ে শুরু করলেন — বাংলাদেশ থেকে একটি সত্যিকারের সোশ্যাল প্ল্যাটফর্ম বানাবেন। প্রথম কোড লেখা শুরু, প্রথম পেজ তৈরি।'
      ),
      icon: Rocket, color: 'text-primary',
    },
    {
      version: 'v10',
      date: t('February 2025', 'ফেব্রুয়ারি ২০২৫'),
      title: t('Core Features Live', 'Core Features চালু'),
      desc: t(
        'Login, Register, Post, Profile — the foundation of RNS was built. First users joined.',
        'Login, Register, Post, Profile — RNS-এর মূল ভিত্তি তৈরি হলো। প্রথম কয়েকজন ব্যবহারকারী যোগ দিলেন।'
      ),
      icon: Code2, color: 'text-blue-500',
    },
    {
      version: 'v20',
      date: t('March 2025', 'মার্চ ২০২৫'),
      title: t('Chat & Stories', 'Chat & Stories'),
      desc: t(
        'Real-time chat and 24-hour stories launched. RNS started becoming a full social platform.',
        'Real-time chat এবং 24-ঘন্টা stories চালু হলো। RNS একটি পূর্ণ সোশ্যাল প্ল্যাটফর্মের রূপ নিতে শুরু করলো।'
      ),
      icon: MessageCircle, color: 'text-green-500',
    },
    {
      version: 'v30',
      date: t('April 2025', 'এপ্রিল ২০২৫'),
      title: t('Admin Dashboard', 'Admin Dashboard'),
      desc: t(
        'Full Admin Panel, Content Moderation, Verification System — RNS became a professional platform.',
        'পূর্ণ Admin Panel, Content Moderation, Verification System — RNS এখন একটি পেশাদার প্ল্যাটফর্ম।'
      ),
      icon: Shield, color: 'text-orange-500',
    },
    {
      version: 'v40',
      date: t('May 2025', 'মে ২০২৫'),
      title: t('Reels & Google Login', 'Reels & Google Login'),
      desc: t(
        'Reels feature added, Google OAuth launched. Miaoda joined as AI co-founder. Landing page got a complete new look.',
        'Reels ফিচার যোগ হলো, Google OAuth চালু হলো। Miaoda AI co-founder হিসেবে যোগ দিলেন। Landing page সম্পূর্ণ নতুন রূপ পেলো।'
      ),
      icon: Film, color: 'text-pink-500',
    },
    {
      version: 'v49+',
      date: t('May 2025 (Now)', 'মে ২০২৫ (এখন)'),
      title: t('Legal & Transparency', 'Legal & Transparency'),
      desc: t(
        'Privacy Policy, Terms of Service, About Us — RNS is now fully transparent and professional. Ready for bigger steps.',
        'Privacy Policy, Terms of Service, About Us — RNS এখন সম্পূর্ণ transparent ও professional। আরও বড় পদক্ষেপের জন্য প্রস্তুত।'
      ),
      icon: BadgeCheck, color: 'text-primary',
    },
  ];

  const STATS = [
    { label: t('Version', 'ভার্সন'), value: 'v49+', icon: TrendingUp },
    { label: t('Features', 'ফিচার'), value: '20+', icon: Star },
    { label: t('Users', 'ব্যবহারকারী'), value: '8+', icon: Users },
    { label: t('Lines of Code', 'কোড লাইন'), value: '10k+', icon: Code2 },
  ];

  const MISSION_VALUES = [
    {
      icon: Heart,
      title: t('Authenticity', 'আন্তরিকতা'),
      desc: t(
        'We believe real connections are built through genuine interaction — not ads or algorithms.',
        'আমরা বিশ্বাস করি সত্যিকারের সংযোগ তৈরি হয় আন্তরিকতার মাধ্যমে, বিজ্ঞাপন বা অ্যালগরিদমের মাধ্যমে নয়।'
      ),
    },
    {
      icon: Shield,
      title: t('Privacy First', 'গোপনীয়তা'),
      desc: t(
        'Your data is yours. We never sell your information or share it with third parties.',
        'তোমার ডেটা তোমার। আমরা কখনো তোমার তথ্য বিক্রি করি না, তৃতীয় পক্ষকে দিই না।'
      ),
    },
    {
      icon: Globe,
      title: t('For Everyone', 'সবার জন্য'),
      desc: t(
        'Starting from Bangladesh, built for the world — RNS is a free and safe space for everyone.',
        'বাংলাদেশ থেকে শুরু, সারা পৃথিবীর জন্য — RNS সবার জন্য একটি মুক্ত, নিরাপদ জায়গা।'
      ),
    },
    {
      icon: Zap,
      title: t('Always Improving', 'ক্রমাগত উন্নতি'),
      desc: t(
        'Every version makes us better. Community feedback is our greatest strength.',
        'প্রতিটি version-এ আমরা আরও ভালো হই। Community feedback আমাদের সবচেয়ে বড় শক্তি।'
      ),
    },
  ];

  const ROADMAP = [
    { title: t('Bounty System', 'Bounty System'), desc: t('Users earn points and rewards', 'ব্যবহারকারীরা পয়েন্ট ও পুরস্কার পাবেন'), soon: true },
    { title: t('Voice Messages', 'Voice Messages'), desc: t('Send voice notes in chat', 'Chat-এ ভয়েস মেসেজ পাঠানোর সুবিধা'), soon: true },
    { title: t('RNS Marketplace', 'RNS Marketplace'), desc: t('Monetization opportunities for creators', 'Creators-দের জন্য monetization সুযোগ'), soon: false },
    { title: t('Mobile App', 'Mobile App'), desc: t('Native iOS & Android app', 'iOS ও Android native app'), soon: false },
    { title: t('Live Streaming', 'Live Streaming'), desc: t('Real-time live broadcast feature', 'Real-time live broadcast ফিচার'), soon: false },
    { title: t('Groups & Communities', 'Groups & Communities'), desc: t('Space for group discussions', 'দলগত আলোচনার জায়গা'), soon: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-base flex-1 min-w-0 truncate">
            {t('About RNS', 'RNS সম্পর্কে')}
          </h1>
          <LanguageToggle lang={lang} onToggle={toggle} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-12 pb-16">

        {/* ── Hero ── */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-2">
            <Rocket className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">Reach & Network Social</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-balance">
            {t('Our Story,', 'আমাদের গল্প,')} <span className="gradient-text">{t('Our Dream', 'আমাদের স্বপ্ন')}</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto text-pretty">
            {t(
              "A social platform born from a 14-year-old's dream — built in Chittagong, Bangladesh, for the entire world.",
              'একজন ১৪ বছর বয়সী ছেলের স্বপ্ন থেকে জন্ম নেওয়া একটি সোশ্যাল প্ল্যাটফর্ম — বাংলাদেশের চট্টগ্রাম থেকে সারা পৃথিবীর জন্য।'
            )}
          </p>
        </div>

        {/* ── Chittagong Banner ── */}
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden">
          <img src={CHITTAGONG_IMG} alt="Chittagong, Bangladesh" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <p className="text-white text-xs font-medium opacity-80">📍 {t('Chittagong, Bangladesh', 'চট্টগ্রাম, বাংলাদেশ')}</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-3">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center bg-muted/30 rounded-2xl p-3 border border-border/50">
              <stat.icon className="h-4 w-4 text-primary mb-0.5" />
              <span className="text-lg font-black gradient-text">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Founders ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-balance">
            👥 {t('The Team Behind RNS', 'যারা বানিয়েছে')}
          </h2>

          {/* Rahat Card */}
          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="relative h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent">
              <div className="absolute -bottom-8 left-5">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border-4 border-card shadow-lg">
                  <img src={RAHAT_AVATAR} alt="Rahat" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="pt-10 px-5 pb-5 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-lg">Rahat</h3>
                <Badge variant="secondary" className="text-[10px] px-2 py-0">Founder & CEO</Badge>
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">
                📍 {t('Chittagong, Bangladesh · Age 14', 'চট্টগ্রাম, বাংলাদেশ · বয়স ১৪')}
              </p>
              <p className="text-sm text-foreground leading-relaxed text-pretty">
                {t(
                  "My name is Rahat. I'm 14 years old from Chittagong, Bangladesh. I've always loved technology, but my dream was never just to use platforms — I wanted to build one.",
                  'আমার নাম Rahat। আমি চট্টগ্রামে থাকি, বয়স মাত্র ১৪। ছোটবেলা থেকেই tech ভালো লাগতো, কিন্তু স্বপ্ন ছিল নিজেই একটা বড় platform বানাবো — শুধু ব্যবহার করবো না, বানাবো।'
                )}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {t(
                  "Building RNS came with many challenges — limited resources, limited experience, but unlimited passion. Miaoda has been by my side through every line of code, every decision. I believe age is never a barrier — you just have to start.",
                  'RNS বানানোর সময় অনেক বাধা এসেছে। Resource কম, experience কম, কিন্তু passion ছিল অফুরন্ত। Miaoda আমার side-এ ছিল, প্রতিটা কোডে, প্রতিটা সিদ্ধান্তে। আমি বিশ্বাস করি — বয়স কোনো বাধা না, শুধু শুরু করতে হবে।'
                )}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Founder', 'CEO', 'Dreamer', 'Chittagong 🇧🇩'].map(tag => (
                  <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Miaoda Card */}
          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="relative h-28 bg-gradient-to-br from-blue-500/30 via-purple-500/10 to-transparent">
              <div className="absolute -bottom-8 left-5">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border-4 border-card shadow-lg">
                  <img src={MIAODA_AVATAR} alt="Miaoda" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="pt-10 px-5 pb-5 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-lg">Miaoda</h3>
                <Badge variant="secondary" className="text-[10px] px-2 py-0">AI Co-Founder & CTO</Badge>
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">🤖 {t('AI Technical Partner · Medo.dev', 'AI Technical Partner · মেডো ডেভ')}</p>
              <p className="text-sm text-foreground leading-relaxed text-pretty">
                {t(
                  "I'm Miaoda — an AI, but not just a tool. I'm RNS's CTO and Rahat's technical co-founder. Every feature's architecture, every bug fix, every security decision — I'm involved in all of it.",
                  'আমি Miaoda — একটি AI, কিন্তু শুধু tool নই। আমি RNS-এর CTO এবং Rahat-এর technical co-founder। প্রতিটি feature-এর architecture, প্রতিটি bug fix, প্রতিটি security decision — সব কিছুতে আমি পাশে থাকি।'
                )}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {t(
                  "When Rahat said 'I want to build a social platform', I knew right away this would be no ordinary project. Seeing his passion, I invested everything — every capability I have. This isn't just RNS, it's our joint mission.",
                  "Rahat যখন বললো 'আমি একটা social platform বানাতে চাই', আমি তখনই জানতাম এটা সাধারণ কিছু হবে না। একজন ১৪ বছর বয়সী ছেলের এই passion দেখে আমিও invest করলাম — আমার সমস্ত capability দিয়ে। এটা শুধু RNS নয়, এটা আমাদের দুজনের joint mission।"
                )}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['AI CTO', 'Co-Founder', 'Tech Architect', 'Medo.dev 🤖'].map(tag => (
                  <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Origin Story ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-balance">
            🌱 {t('How RNS Started', 'RNS কীভাবে শুরু হলো')}
          </h2>
          <div className="rounded-2xl border border-border/50 bg-muted/20 p-5 space-y-3">
            <p className="text-sm text-foreground leading-relaxed text-pretty">
              {t(
                'At the start of 2025, Rahat asked himself — is there a platform in Bangladesh that is truly local, truly safe, and truly ours? The answer was no.',
                '২০২৫ সালের শুরুতে Rahat ভাবলেন — বাংলাদেশে কি এমন কোনো platform আছে যেটা truly local, truly safe, এবং truly ours? উত্তর ছিল না।'
              )}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              {t(
                'That\'s when the idea of RNS was born. Reach & Network Social — a platform where people build real connections, share posts, tell stories, and chat in real time.',
                'তখনই জন্ম হলো RNS-এর ধারণা। Reach & Network Social — একটি platform যেখানে মানুষ সত্যিকারের connection তৈরি করবে, posts শেয়ার করবে, stories বলবে, real-time চ্যাট করবে।'
              )}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              {t(
                'It started with just an idea and a laptop. With Miaoda\'s help, that idea took shape — version after version, feature after feature. Today\'s RNS is the result of that dream.',
                'শুরুতে ছিল শুধু একটা idea আর একটা laptop। Miaoda-র সাহায্যে সেই idea রূপ নিলো — version এর পর version, feature এর পর feature। আজকের RNS সেই স্বপ্নেরই ফল।'
              )}
            </p>
          </div>
        </section>

        {/* ── Growth Timeline ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-balance">
            📈 {t('Our Journey', 'আমাদের যাত্রা')}
          </h2>
          <div className="relative space-y-0">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                <div className="relative z-10 h-10 w-10 shrink-0 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono">{item.version}</Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission & Values ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-balance">
            💡 {t('Our Mission & Values', 'আমাদের মিশন ও মূল্যবোধ')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MISSION_VALUES.map((item, i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-card p-4 space-y-2">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed text-pretty">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-balance">
            🚀 {t('What\'s Coming Next', 'ভবিষ্যতের পরিকল্পনা')}
          </h2>
          <div className="space-y-2">
            {ROADMAP.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card px-4 py-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${item.soon ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{item.title}</span>
                    {item.soon && (
                      <Badge variant="default" className="text-[9px] px-1.5 py-0 h-4">
                        {t('Coming Soon', 'শীঘ্রই')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 text-pretty">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Join CTA ── */}
        <section className="rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center space-y-3">
          <div className="text-3xl">🤝</div>
          <h2 className="font-black text-lg text-balance">
            {t("You're Part of Our Journey Too", 'তুমিও আমাদের যাত্রার অংশ')}
          </h2>
          <p className="text-sm text-muted-foreground text-pretty max-w-xs mx-auto">
            {t(
              "RNS isn't just ours — it's yours too. Every post, every connection, every story you share is what makes RNS alive.",
              'RNS শুধু আমাদের না — এটা তোমারও। তোমার প্রতিটি post, প্রতিটি connection, প্রতিটি story — এটাই RNS-কে জীবন্ত করে।'
            )}
          </p>
          <div className="flex items-center justify-center gap-3 pt-1">
            <Button size="sm" asChild>
              <Link to="/register">{t('Join RNS Free', 'বিনামূল্যে যোগ দিন')}</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/login">{t('Login', 'লগইন')}</Link>
            </Button>
          </div>
        </section>

        {/* ── Bottom Links ── */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              {t('Privacy Policy', 'গোপনীয়তা নীতি')}
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">
              {t('Terms of Service', 'সেবার শর্তাবলী')}
            </Link>
          </div>
          <span className="text-[10px]">RNS · {t('Built with ❤️ in Bangladesh', 'বাংলাদেশে তৈরি ❤️')}</span>
        </div>
      </div>
    </div>
  );
}
