import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/hooks/use-language';

const SECTIONS_EN = [
  {
    title: '1. Information We Collect',
    content: [
      'Account information: username, email address, full name, profile photo, and bio.',
      'Content you create: posts, stories, reels, comments, likes, and messages.',
      'Activity data: pages visited, interactions, search queries, and session timestamps.',
      'Device information: browser type, operating system, and IP address for security purposes.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To provide, maintain, and improve the RNS social networking service.',
      'To show you relevant content from people you follow.',
      'To send you notifications based on your preferences (you can turn these off in Settings).',
      'To detect and prevent fraud, spam, and abuse.',
      'We do NOT use your data for advertising or sell it to third parties.',
    ],
  },
  {
    title: '3. Information Sharing',
    content: [
      'Public profiles: your username, full name, bio, and public posts are visible to all users.',
      'Private accounts: your posts are only visible to approved followers.',
      'Messages: direct messages are private between sender and recipient only.',
      'We do not share your personal data with advertisers or data brokers.',
      'We may share data only if required by law or to protect user safety.',
    ],
  },
  {
    title: '4. Data Storage & Security',
    content: [
      'Your data is stored securely on Supabase infrastructure with enterprise-grade encryption.',
      'Story media is automatically deleted after 24 hours.',
      'Profile photos and post images are stored in secure cloud storage.',
      'We use Row-Level Security (RLS) to ensure users can only access their own private data.',
      'We regularly monitor for security vulnerabilities and unauthorized access.',
    ],
  },
  {
    title: '5. Your Rights & Choices',
    content: [
      'Access: you can view all your data through your Profile and Settings pages.',
      'Edit: you can update your profile information at any time.',
      'Delete: you can delete any of your posts, stories, or comments.',
      'Account deletion: you can permanently delete your account from Settings. All your data will be removed.',
      'Notifications: you can manage notification preferences in Settings.',
    ],
  },
  {
    title: "6. Children's Privacy",
    content: [
      'RNS is intended for users aged 13 and older.',
      'We do not knowingly collect personal information from children under 13.',
      'If you believe a child under 13 has provided us data, please contact us so we can remove it.',
    ],
  },
  {
    title: '7. Cookies & Local Storage',
    content: [
      'We use browser local storage to keep you logged in between sessions.',
      'We do not use tracking cookies or third-party analytics cookies.',
      'Clearing your browser data will log you out of RNS.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    content: [
      'We may update this Privacy Policy as RNS grows and adds new features.',
      'We will notify you of significant changes via an in-app notification.',
      'Continued use of RNS after changes means you accept the updated policy.',
    ],
  },
  {
    title: '9. Contact Us',
    content: [
      'If you have questions about this Privacy Policy or your data, you can reach out to us through the "Report a Problem" option in the RNS Settings page.',
      'RNS is built and operated by Rahat, Founder & CEO of Reach & Network Social.',
    ],
  },
];

const SECTIONS_BN = [
  {
    title: '১. আমরা যে তথ্য সংগ্রহ করি',
    content: [
      'অ্যাকাউন্ট তথ্য: ইউজারনেম, ইমেইল ঠিকানা, পুরো নাম, প্রোফাইল ছবি এবং বায়ো।',
      'আপনি যে কন্টেন্ট তৈরি করেন: পোস্ট, স্টোরি, রিলস, কমেন্ট, লাইক এবং মেসেজ।',
      'কার্যকলাপের ডেটা: ভিজিট করা পেজ, মিথস্ক্রিয়া, সার্চ কোয়েরি এবং সেশন টাইমস্ট্যাম্প।',
      'ডিভাইস তথ্য: নিরাপত্তার উদ্দেশ্যে ব্রাউজারের ধরন, অপারেটিং সিস্টেম এবং আইপি ঠিকানা।',
    ],
  },
  {
    title: '২. আমরা আপনার তথ্য কীভাবে ব্যবহার করি',
    content: [
      'RNS সোশ্যাল নেটওয়ার্কিং সেবা প্রদান, রক্ষণাবেক্ষণ এবং উন্নত করতে।',
      'আপনি যাদের ফলো করেন তাদের প্রাসঙ্গিক কন্টেন্ট দেখাতে।',
      'আপনার পছন্দ অনুযায়ী নোটিফিকেশন পাঠাতে (আপনি Settings থেকে এটি বন্ধ করতে পারেন)।',
      'জালিয়াতি, স্প্যাম এবং অপব্যবহার সনাক্ত ও প্রতিরোধ করতে।',
      'আমরা বিজ্ঞাপনের জন্য আপনার ডেটা ব্যবহার করি না বা তৃতীয় পক্ষের কাছে বিক্রি করি না।',
    ],
  },
  {
    title: '৩. তথ্য শেয়ার করা',
    content: [
      'পাবলিক প্রোফাইল: আপনার ইউজারনেম, পুরো নাম, বায়ো এবং পাবলিক পোস্ট সকল ব্যবহারকারীর কাছে দৃশ্যমান।',
      'প্রাইভেট অ্যাকাউন্ট: আপনার পোস্ট শুধুমাত্র অনুমোদিত ফলোয়ারদের কাছে দৃশ্যমান।',
      'মেসেজ: সরাসরি বার্তা শুধুমাত্র প্রেরক ও প্রাপকের মধ্যে গোপন থাকে।',
      'আমরা বিজ্ঞাপনদাতা বা ডেটা ব্রোকারদের সাথে আপনার ব্যক্তিগত ডেটা শেয়ার করি না।',
      'আইনের প্রয়োজনে বা ব্যবহারকারীর নিরাপত্তা রক্ষার জন্যই কেবল ডেটা শেয়ার করা হতে পারে।',
    ],
  },
  {
    title: '৪. ডেটা সংরক্ষণ ও নিরাপত্তা',
    content: [
      'আপনার ডেটা এন্টারপ্রাইজ-গ্রেড এনক্রিপশন সহ Supabase ইনফ্রাস্ট্রাকচারে নিরাপদে সংরক্ষিত।',
      'স্টোরি মিডিয়া ২৪ ঘন্টা পরে স্বয়ংক্রিয়ভাবে মুছে যায়।',
      'প্রোফাইল ছবি এবং পোস্টের ছবি নিরাপদ ক্লাউড স্টোরেজে সংরক্ষিত।',
      'ব্যবহারকারীরা যাতে শুধুমাত্র নিজেদের ব্যক্তিগত ডেটা অ্যাক্সেস করতে পারে তা নিশ্চিত করতে আমরা Row-Level Security (RLS) ব্যবহার করি।',
      'আমরা নিয়মিত নিরাপত্তা দুর্বলতা এবং অননুমোদিত অ্যাক্সেসের জন্য পর্যবেক্ষণ করি।',
    ],
  },
  {
    title: '৫. আপনার অধিকার ও পছন্দ',
    content: [
      'অ্যাক্সেস: আপনি আপনার প্রোফাইল ও Settings পেজের মাধ্যমে সব ডেটা দেখতে পারবেন।',
      'সম্পাদনা: আপনি যেকোনো সময় আপনার প্রোফাইল তথ্য আপডেট করতে পারবেন।',
      'মুছে ফেলা: আপনি আপনার যেকোনো পোস্ট, স্টোরি বা কমেন্ট মুছতে পারবেন।',
      'অ্যাকাউন্ট ডিলিট: আপনি Settings থেকে স্থায়ীভাবে আপনার অ্যাকাউন্ট মুছতে পারবেন। আপনার সব ডেটা মুছে ফেলা হবে।',
      'নোটিফিকেশন: আপনি Settings-এ নোটিফিকেশন পছন্দ পরিচালনা করতে পারবেন।',
    ],
  },
  {
    title: '৬. শিশুদের গোপনীয়তা',
    content: [
      'RNS ১৩ বছর বা তার বেশি বয়সী ব্যবহারকারীদের জন্য।',
      'আমরা ১৩ বছরের কম বয়সী শিশুদের কাছ থেকে সচেতনভাবে ব্যক্তিগত তথ্য সংগ্রহ করি না।',
      'যদি আপনি মনে করেন ১৩ বছরের কম বয়সী কোনো শিশু আমাদের ডেটা দিয়েছে, তাহলে আমাদের সাথে যোগাযোগ করুন।',
    ],
  },
  {
    title: '৭. কুকিজ ও লোকাল স্টোরেজ',
    content: [
      'আমরা সেশনের মধ্যে আপনাকে লগ ইন রাখতে ব্রাউজার লোকাল স্টোরেজ ব্যবহার করি।',
      'আমরা ট্র্যাকিং কুকি বা তৃতীয় পক্ষের অ্যানালিটিক্স কুকি ব্যবহার করি না।',
      'আপনার ব্রাউজার ডেটা মুছে ফেললে RNS থেকে লগ আউট হয়ে যাবে।',
    ],
  },
  {
    title: '৮. এই নীতির পরিবর্তন',
    content: [
      'RNS বাড়ার সাথে সাথে এবং নতুন ফিচার যোগ হওয়ার সাথে সাথে আমরা এই Privacy Policy আপডেট করতে পারি।',
      'উল্লেখযোগ্য পরিবর্তনের ক্ষেত্রে আমরা অ্যাপ-এ নোটিফিকেশনের মাধ্যমে আপনাকে জানাবো।',
      'পরিবর্তনের পরেও RNS ব্যবহার অব্যাহত রাখার অর্থ হলো আপনি আপডেট হওয়া নীতি গ্রহণ করেছেন।',
    ],
  },
  {
    title: '৯. যোগাযোগ করুন',
    content: [
      'এই Privacy Policy বা আপনার ডেটা সম্পর্কে প্রশ্ন থাকলে, RNS Settings পেজের "Report a Problem" অপশনের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।',
      'RNS তৈরি এবং পরিচালনা করেন Rahat, Reach & Network Social-এর Founder ও CEO।',
    ],
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const { lang, toggle, t } = useLanguage();
  const SECTIONS = lang === 'en' ? SECTIONS_EN : SECTIONS_BN;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Shield className="h-5 w-5 text-primary shrink-0" />
            <h1 className="font-semibold text-base truncate">
              {t('Privacy Policy', 'গোপনীয়তা নীতি')}
            </h1>
          </div>
          <LanguageToggle lang={lang} onToggle={toggle} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Intro */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black gradient-text">RNS</span>
            <span className="text-muted-foreground text-sm">· Reach & Network Social</span>
          </div>
          <p className="text-sm text-muted-foreground text-pretty">
            {t(
              'Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have.',
              'আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। এই নীতিতে ব্যাখ্যা করা হয়েছে আমরা কী তথ্য সংগ্রহ করি, কীভাবে ব্যবহার করি এবং আপনার কী পছন্দ আছে।'
            )}{' '}
            {t('Last updated:', 'সর্বশেষ আপডেট:')} <strong className="text-foreground">{t('May 2025', 'মে ২০২৫')}</strong>.
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="font-semibold text-foreground text-base text-balance">{section.title}</h2>
            <ul className="space-y-2">
              {section.content.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground text-pretty">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer note */}
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <p className="text-xs text-muted-foreground text-pretty">
            {t(
              'By using RNS, you acknowledge that you have read and understood this Privacy Policy. For questions, use the ',
              'RNS ব্যবহার করে আপনি স্বীকার করছেন যে আপনি এই Privacy Policy পড়েছেন এবং বুঝেছেন। প্রশ্নের জন্য Settings-এ '
            )}
            <strong className="text-foreground">{t('Report a Problem', 'Report a Problem')}</strong>
            {t(' option in Settings.', ' অপশন ব্যবহার করুন।')}
          </p>
        </div>

        {/* Back link */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <Link to="/terms" className="text-sm text-primary hover:underline font-medium">
            {t('Terms of Service →', 'সেবার শর্তাবলী →')}
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('Back to Home', 'হোমে ফিরুন')}
          </Link>
        </div>
      </div>
    </div>
  );
}

