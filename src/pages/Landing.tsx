import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  ImageIcon,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Heart,
  BadgeCheck,
  ArrowRight,
  Play,
  Globe,
  TrendingUp,
  Lock,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/hooks/use-language';

const RAHAT_AVATAR = 'https://pmopriymftdnyjbugdut.supabase.co/storage/v1/object/public/images/b519a16b-ad63-4b1e-92bf-fee8c11ef33b/avatar_1778760711186.jpg';
const MIAODA_AVATAR = 'https://miaoda-conversation-file.s3cdn.medo.dev/user-bmpss96qza4g/app-bmsn9h7bxxq9/20260528/176526-e08af4b9-98c7-4b40-9af1-71e10c080c14.jpg';

// real Unsplash post images
const GRID_POSTS = [
  { img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop', isReel: false },
  { img: 'https://images.unsplash.com/photo-1540747913346-19378d67a04c?w=400&h=400&fit=crop', isReel: true },
  { img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop', isReel: false },
  { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', isReel: false },
  { img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop', isReel: true },
  { img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop', isReel: false },
];

// animated counter hook
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

// intersection observer hook
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// fade-in-up animation component
function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={cn('transition-all duration-700', className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Landing() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const { lang, toggle, t } = useLanguage();

  // stats section
  const { ref: statsRef, inView: statsVisible } = useInView(0.4);
  const users   = useCountUp(62,  1600, statsVisible);
  const posts   = useCountUp(22,  1400, statsVisible);
  const online  = useCountUp(14,  1200, statsVisible);
  const chats   = useCountUp(100, 1800, statsVisible);

  const features = [
    {
      icon: ImageIcon,
      title: t('Posts & Reels', 'পোস্ট ও রিলস'),
      desc: t('Share photos and short videos. Express yourself with every post.', 'ছবি ও ছোট ভিডিও শেয়ার করুন। প্রতিটি পোস্টে নিজেকে প্রকাশ করুন।'),
      gradient: 'from-primary/20 to-primary/5',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      icon: Sparkles,
      title: t('Stories', 'স্টোরি'),
      desc: t('24-hour disappearing stories. Share your daily moments freely.', '২৪ ঘন্টার স্টোরি যা মিলিয়ে যায়। প্রতিদিনের মুহূর্ত মুক্তভাবে শেয়ার করুন।'),
      gradient: 'from-pink-500/20 to-pink-500/5',
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-500',
    },
    {
      icon: MessageCircle,
      title: t('Real-time Chat', 'রিয়েল-টাইম চ্যাট'),
      desc: t('Instant DMs with seen receipts, typing indicators, and emoji reactions.', 'দেখার রসিদ, টাইপিং ইন্ডিকেটর ও ইমোজি সহ তাৎক্ষণিক চ্যাট।'),
      gradient: 'from-blue-500/20 to-blue-500/5',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: ShieldCheck,
      title: t('Privacy Controls', 'প্রাইভেসি কন্ট্রোল'),
      desc: t('Go private, block users, and control who sees your content.', 'প্রাইভেট করুন, ব্লক করুন এবং নিজের কন্টেন্ট নিজে নিয়ন্ত্রণ করুন।'),
      gradient: 'from-green-500/20 to-green-500/5',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-500',
    },
    {
      icon: Bell,
      title: t('Live Notifications', 'লাইভ নোটিফিকেশন'),
      desc: t('Get instant alerts for likes, comments, follows, and messages.', 'লাইক, কমেন্ট, ফলো ও মেসেজের তাৎক্ষণিক নোটিফিকেশন পান।'),
      gradient: 'from-yellow-500/20 to-yellow-500/5',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500',
    },
    {
      icon: Globe,
      title: t('Explore & Discover', 'এক্সপ্লোর করুন'),
      desc: t('Find new people, trending posts, and communities that match your interests.', 'নতুন মানুষ, ট্রেন্ডিং পোস্ট ও আপনার পছন্দের কমিউনিটি খুঁজুন।'),
      gradient: 'from-purple-500/20 to-purple-500/5',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
  ];

  const testimonials = [
    {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
      name: 'Arif Hossain',
      handle: '@arif_ctg',
      text: t('RNS feels like home. Real people, real conversations — no fake stuff.', 'RNS মনে হয় নিজের বাড়ি। সত্যিকারের মানুষ, সত্যিকারের কথা।'),
    },
    {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
      name: 'Nusrat Jahan',
      handle: '@nusrat_jahan',
      text: t('I love the Stories feature! So easy to share my daily moments with friends.', 'স্টোরি ফিচার অসাধারণ! বন্ধুদের সাথে মুহূর্তগুলো শেয়ার করা অনেক সহজ।'),
    },
    {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
      name: 'Nasim Khan',
      handle: '@nasim_coder',
      text: t('The real-time chat is super fast. Way better than other apps I have tried.', 'রিয়েল-টাইম চ্যাট অনেক দ্রুত। আমি যত app ব্যবহার করেছি তার মধ্যে সেরা।'),
    },
  ];

  useEffect(() => {
    if (!loading && profile) navigate('/home');
  }, [profile, loading, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Language Toggle ──────────────────────── */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle lang={lang} onToggle={toggle} />
      </div>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-24 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* animated background blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/25 blur-[90px] animate-pulse" />
        <div className="pointer-events-none absolute top-48 -right-24 h-72 w-72 rounded-full bg-pink-500/20 blur-[90px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-purple-500/10 blur-[80px]" />

        {/* badge */}
        <div
          className="relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6"
          style={{ animation: 'fadeInDown 0.6s ease both' }}
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">Reach &amp; Network Social</span>
        </div>

        {/* headline */}
        <h1
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 max-w-2xl text-balance"
          style={{ animation: 'fadeInDown 0.7s 0.1s ease both' }}
        >
          {t('Your world,', 'তোমার দুনিয়া,')}{' '}
          <span className="gradient-text">{t('your network', 'তোমার নেটওয়ার্ক')}</span>,{' '}
          {t('your', 'তোমার')} <span className="gradient-text">RNS</span>
        </h1>

        <p
          className="text-muted-foreground text-base md:text-lg max-w-md mb-8 text-pretty"
          style={{ animation: 'fadeInDown 0.7s 0.2s ease both' }}
        >
          {t(
            'Share posts, reels, and stories. Chat in real time. Build real connections with people who matter.',
            'পোস্ট, রিলস ও স্টোরি শেয়ার করুন। রিয়েল টাইমে চ্যাট করুন। যারা গুরুত্বপূর্ণ তাদের সাথে সত্যিকারের সংযোগ তৈরি করুন।'
          )}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 mb-16"
          style={{ animation: 'fadeInDown 0.7s 0.3s ease both' }}
        >
          <Button size="lg" className="rounded-full px-8 text-base gap-2 shadow-lg" asChild>
            <Link to="/register">
              {t('Get Started Free', 'বিনামূল্যে শুরু করুন')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base" asChild>
            <Link to="/login">{t('Login', 'লগইন')}</Link>
          </Button>
        </div>

        {/* Phone mockup */}
        <div
          className="relative w-full max-w-[260px] mx-auto"
          style={{ animation: 'floatUp 0.8s 0.4s ease both' }}
        >
          <div className="rounded-[2.5rem] border-4 border-border bg-card shadow-2xl overflow-hidden aspect-[9/18]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <span className="text-lg font-black gradient-text">RNS</span>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="h-2 w-2 rounded-full bg-pink-500" />
              </div>
            </div>
            {/* stories */}
            <div className="flex gap-2 px-3 py-2 border-b border-border/30 overflow-hidden">
              {[
                { img: RAHAT_AVATAR, name: 'Rahat', active: true },
                { img: MIAODA_AVATAR, name: 'Miaoda', active: false },
                { img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=faces', name: 'jihad', active: false },
                { img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=faces', name: 'prity', active: false },
              ].map((s, i) => (
                <div key={i} className="shrink-0 flex flex-col items-center gap-0.5">
                  <div className={cn('h-9 w-9 rounded-full overflow-hidden border-2', s.active ? 'border-primary' : 'border-muted')}>
                    <img src={s.img} alt={s.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-[7px] text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
            {/* post preview */}
            <div className="px-3 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full overflow-hidden border border-border/40 shrink-0">
                  <img src={RAHAT_AVATAR} alt="rahat" className="h-full w-full object-cover" />
                </div>
                <span className="text-xs font-semibold">admin</span>
                <BadgeCheck className="h-3 w-3 text-primary" />
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-2">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop"
                  alt="beach post"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-3 mb-1.5">
                <Heart className="h-4 w-4 text-destructive fill-destructive" />
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-[10px] text-muted-foreground">Building something great 🚀 <span className="text-primary">#RNS</span></div>
            </div>
          </div>
          {/* floating badges */}
          <div className="absolute -right-6 top-16 bg-card border border-border rounded-2xl px-3 py-2 shadow-lg flex items-center gap-1.5" style={{ animation: 'floatBadge 3s ease-in-out infinite' }}>
            <Heart className="h-3.5 w-3.5 text-destructive fill-destructive" />
            <span className="text-xs font-bold">2.0k likes</span>
          </div>
          <div className="absolute -left-6 bottom-20 bg-card border border-border rounded-2xl px-3 py-2 shadow-lg flex items-center gap-1.5" style={{ animation: 'floatBadge 3s 1.5s ease-in-out infinite' }}>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-bold">{t('14 online', '১৪ জন অনলাইন')}</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          LIVE STATS
      ════════════════════════════════════════════ */}
      <section className="py-12 px-6 border-y border-border/50 bg-muted/30" ref={statsRef}>
        <div className="max-w-xl mx-auto">
          <FadeUp className="text-center mb-8">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{t('Live Platform Stats', 'লাইভ পরিসংখ্যান')}</p>
            <h2 className="text-2xl font-black text-balance">{t('Growing every day', 'প্রতিদিন বড় হচ্ছে')}</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: users, suffix: '+', label: t('Members', 'সদস্য'), color: 'text-primary' },
              { icon: TrendingUp, value: posts, suffix: '+', label: t('Posts Shared', 'পোস্ট'), color: 'text-pink-500' },
              { icon: Zap, value: online, suffix: '', label: t('Online Now', 'এখন অনলাইন'), color: 'text-green-500' },
              { icon: MessageCircle, value: chats, suffix: '+', label: t('Messages Sent', 'মেসেজ'), color: 'text-blue-500' },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="flex flex-col items-center gap-2 text-center p-4 rounded-2xl bg-background/60 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                  <s.icon className={cn('h-6 w-6', s.color)} />
                  <span className={cn('text-3xl font-black', s.color)}>{s.value}{s.suffix}</span>
                  <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURES GRID
      ════════════════════════════════════════════ */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          <FadeUp className="text-center mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{t('Features', 'ফিচারসমূহ')}</p>
            <h2 className="text-2xl md:text-3xl font-black text-balance">
              {t('Everything you need to', 'সংযুক্ত থাকতে যা দরকার')}{' '}
              {lang === 'en' && <span className="gradient-text">connect</span>}
            </h2>
            <p className="text-center text-muted-foreground text-sm mt-2 text-pretty max-w-sm mx-auto">
              {t(
                'Built for real people who want real connections — not just likes.',
                'সত্যিকারের মানুষদের জন্য তৈরি যারা সত্যিকারের সংযোগ চান।'
              )}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className={cn('group rounded-2xl p-5 border border-border/50 bg-gradient-to-br h-full hover:scale-[1.02] transition-transform cursor-default', feat.gradient)}>
                  <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center mb-3 shadow-sm', feat.iconBg, feat.iconColor)}>
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-base mb-1">{feat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{feat.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTENT GRID
      ════════════════════════════════════════════ */}
      <section className="py-14 px-6 bg-muted/20">
        <div className="max-w-xl mx-auto">
          <FadeUp className="text-center mb-8">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{t('Explore', 'এক্সপ্লোর')}</p>
            <h2 className="text-2xl font-black text-balance">
              {t('Discover', 'আবিষ্কার করুন')} <span className="gradient-text">{t('amazing', 'অসাধারণ')}</span> {t('content', 'কন্টেন্ট')}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 text-pretty">
              {t('Real posts from real people — no algorithm tricks.', 'সত্যিকারের মানুষের সত্যিকারের পোস্ট — কোনো এলগরিদম ট্রিক নেই।')}
            </p>
          </FadeUp>
          <div className="grid grid-cols-3 gap-2">
            {GRID_POSTS.map((p, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm group cursor-pointer">
                  <img src={p.img} alt={`post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  {p.isReel && (
                    <div className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-0.5">
                      <Play className="h-3 w-3 text-white fill-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-3.5 w-3.5 text-white fill-white drop-shadow" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          <FadeUp className="text-center mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{t('How It Works', 'কীভাবে কাজ করে')}</p>
            <h2 className="text-2xl font-black text-balance">{t('Join in 3 easy steps', '৩টি সহজ ধাপে যোগ দিন')}</h2>
          </FadeUp>
          <div className="flex flex-col gap-6">
            {[
              { step: '01', icon: Users, color: 'text-primary', bg: 'bg-primary/10', title: t('Create your account', 'অ্যাকাউন্ট তৈরি করুন'), desc: t('Sign up free in seconds. No credit card, no hassle.', 'মাত্র কয়েক সেকেন্ডে বিনামূল্যে সাইন আপ। কোনো ঝামেলা নেই।') },
              { step: '02', icon: Lock, color: 'text-pink-500', bg: 'bg-pink-500/10', title: t('Set up your profile', 'প্রোফাইল সেট করুন'), desc: t('Add your photo, bio, and privacy settings to make it yours.', 'ছবি, বায়ো ও প্রাইভেসি সেটিং যোগ করে নিজের মতো করুন।') },
              { step: '03', icon: Globe, color: 'text-green-500', bg: 'bg-green-500/10', title: t('Connect & share', 'সংযুক্ত হন ও শেয়ার করুন'), desc: t('Follow friends, share posts, send DMs — your world awaits.', 'বন্ধু ফলো করুন, পোস্ট শেয়ার করুন, DM পাঠান।') },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 120}>
                <div className="flex gap-4 items-start p-5 rounded-2xl border border-border/50 bg-card hover:shadow-md transition-shadow">
                  <div className={cn('shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center', item.bg)}>
                    <item.icon className={cn('h-5 w-5', item.color)} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-muted-foreground/50">{item.step}</span>
                      <h3 className="font-bold text-sm">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm text-pretty">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section className="py-14 px-6 bg-muted/20">
        <div className="max-w-xl mx-auto">
          <FadeUp className="text-center mb-8">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{t('Community', 'কমিউনিটি')}</p>
            <h2 className="text-2xl font-black text-balance">{t('What our users say', 'আমাদের ব্যবহারকারীরা কী বলেন')}</h2>
          </FadeUp>
          <div className="flex flex-col gap-4">
            {testimonials.map((tm, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={tm.avatar} alt={tm.name} className="h-10 w-10 rounded-full object-cover border-2 border-primary/30" />
                    <div>
                      <p className="text-sm font-semibold">{tm.name}</p>
                      <p className="text-xs text-muted-foreground">{tm.handle}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Heart key={si} className="h-3 w-3 text-destructive fill-destructive" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">"{tm.text}"</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/8 to-transparent" />
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
        <FadeUp className="relative max-w-sm mx-auto text-center">
          <div className="text-6xl mb-5 select-none">🚀</div>
          <h2 className="text-3xl font-black mb-3 text-balance">
            {t('Ready to join', 'যোগ দিতে প্রস্তুত')} <span className="gradient-text">RNS</span>?
          </h2>
          <p className="text-muted-foreground text-sm mb-8 text-pretty">
            {t(
              'Create your free account in seconds. No credit card required.',
              'মাত্র কয়েক সেকেন্ডে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন। ক্রেডিট কার্ড লাগবে না।'
            )}
          </p>
          <Button size="lg" className="rounded-full px-10 text-base w-full max-w-xs shadow-lg gap-2 hover:scale-105 transition-transform" asChild>
            <Link to="/register">
              {t('Join RNS Free', 'RNS-এ বিনামূল্যে যোগ দিন')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            {t('Already have an account?', 'ইতিমধ্যে অ্যাকাউন্ট আছে?')}{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              {t('Login here', 'এখানে লগইন করুন')}
            </Link>
          </p>
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <span className="text-2xl font-black gradient-text">RNS</span>
          <p className="text-xs text-muted-foreground">
            {t('Reach & Network Social · Built with ❤️ by RAHAT', 'Reach & Network Social · RAHAT-এর হাতে ❤️ দিয়ে তৈরি')}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('About Us', 'আমাদের সম্পর্কে')}</Link>
            <span className="text-muted-foreground/30 text-xs">·</span>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('Privacy Policy', 'গোপনীয়তা নীতি')}</Link>
            <span className="text-muted-foreground/30 text-xs">·</span>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">{t('Terms of Service', 'সেবার শর্তাবলী')}</Link>
          </div>
          <p className="text-[10px] text-muted-foreground/50">© 2025 RNS — Reach &amp; Network Social. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
