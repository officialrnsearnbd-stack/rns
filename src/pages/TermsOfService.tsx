import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useLanguage } from '@/hooks/use-language';

const SECTIONS_EN = [
  {
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account or using RNS (Reach & Network Social), you agree to these Terms of Service.',
      'If you do not agree to these terms, please do not use our service.',
      'These terms apply to all users including visitors, registered users, and content creators.',
    ],
  },
  {
    title: '2. Eligibility',
    content: [
      'You must be at least 13 years old to use RNS.',
      'By using RNS, you confirm that you meet this age requirement.',
      'If you are under 18, you should review these terms with a parent or guardian.',
    ],
  },
  {
    title: '3. Your Account',
    content: [
      'You are responsible for keeping your account password secure.',
      'You must not share your account with others or allow others to access it.',
      'You are responsible for all activity that occurs under your account.',
      'You must provide accurate information when creating your account.',
      'Notify us immediately through Settings if you suspect unauthorized account access.',
    ],
  },
  {
    title: '4. Acceptable Use',
    content: [
      'You may use RNS for personal, non-commercial social networking purposes.',
      'You must not post content that is illegal, harmful, threatening, abusive, or harassing.',
      'You must not bully, intimidate, or harass other users.',
      'You must not post hate speech based on race, religion, gender, nationality, or sexual orientation.',
      'You must not impersonate other people or misrepresent your identity.',
      'You must not spam, advertise unsolicited products, or promote scams.',
      'You must not attempt to hack, exploit, or disrupt the RNS platform.',
    ],
  },
  {
    title: '5. Content You Post',
    content: [
      'You retain ownership of all content you create and post on RNS.',
      'By posting content, you grant RNS a license to display it within the platform to other users.',
      'You are solely responsible for the content you post.',
      'RNS does not claim ownership over your photos, videos, or text posts.',
      'You must have the rights to any content you post (no copyright infringement).',
    ],
  },
  {
    title: '6. Content Moderation',
    content: [
      'RNS reserves the right to remove content that violates these terms.',
      'Accounts that repeatedly violate these terms may be suspended or permanently banned.',
      'You can report violating content using the report feature on any post or profile.',
      'We aim to review all reports fairly, but moderation decisions are final.',
    ],
  },
  {
    title: '7. Privacy',
    content: [
      'Your use of RNS is also governed by our Privacy Policy.',
      'Please read our Privacy Policy to understand how we collect and use your data.',
      'By using RNS, you also agree to our Privacy Policy.',
    ],
  },
  {
    title: '8. Service Availability',
    content: [
      'We aim to keep RNS available 24/7 but cannot guarantee uninterrupted service.',
      'We may perform maintenance that temporarily makes the service unavailable.',
      'We are not liable for any loss of data or service interruptions.',
      'RNS is provided "as is" without warranties of any kind.',
    ],
  },
  {
    title: '9. Account Termination',
    content: [
      'You can delete your account at any time from Settings.',
      'RNS may suspend or terminate accounts that violate these terms.',
      'Upon termination, your data will be deleted in accordance with our Privacy Policy.',
      'RNS reserves the right to refuse service to anyone for any reason.',
    ],
  },
  {
    title: '10. Changes to Terms',
    content: [
      'We may update these Terms of Service as RNS grows.',
      'We will notify users of significant changes via an in-app notification.',
      'Continued use of RNS after changes means you accept the updated terms.',
      'These terms were last updated in May 2025.',
    ],
  },
  {
    title: '11. Limitation of Liability',
    content: [
      'RNS is not responsible for content posted by users.',
      'We are not liable for any indirect, incidental, or consequential damages.',
      'Our total liability to you for any claim is limited to the amount you paid us (which is $0 for free users).',
    ],
  },
  {
    title: '12. Contact',
    content: [
      'For questions about these Terms, use the "Report a Problem" option in the RNS Settings page.',
      'RNS is built and operated by Rahat, Founder & CEO of Reach & Network Social.',
    ],
  },
];

const SECTIONS_BN = [
  {
    title: '১. শর্তাবলী গ্রহণ',
    content: [
      'RNS (Reach & Network Social)-এ অ্যাকাউন্ট তৈরি করে বা ব্যবহার করে আপনি এই সেবার শর্তাবলীতে সম্মত হচ্ছেন।',
      'যদি আপনি এই শর্তাবলীতে সম্মত না হন, অনুগ্রহ করে আমাদের সেবা ব্যবহার করবেন না।',
      'এই শর্তাবলী দর্শক, নিবন্ধিত ব্যবহারকারী এবং কন্টেন্ট নির্মাতাসহ সকল ব্যবহারকারীর ক্ষেত্রে প্রযোজ্য।',
    ],
  },
  {
    title: '২. যোগ্যতা',
    content: [
      'RNS ব্যবহার করতে আপনার বয়স কমপক্ষে ১৩ বছর হতে হবে।',
      'RNS ব্যবহার করে আপনি নিশ্চিত করছেন যে আপনি এই বয়সের প্রয়োজনীয়তা পূরণ করেন।',
      'আপনার বয়স ১৮ বছরের কম হলে, অভিভাবকের সাথে এই শর্তাবলী পর্যালোচনা করুন।',
    ],
  },
  {
    title: '৩. আপনার অ্যাকাউন্ট',
    content: [
      'আপনার অ্যাকাউন্টের পাসওয়ার্ড নিরাপদ রাখার দায়িত্ব আপনার।',
      'আপনার অ্যাকাউন্ট অন্যদের সাথে শেয়ার করা বা অন্যদের অ্যাক্সেস দেওয়া উচিত নয়।',
      'আপনার অ্যাকাউন্টের অধীনে যে সকল কার্যকলাপ ঘটে তার দায়িত্ব আপনার।',
      'অ্যাকাউন্ট তৈরির সময় সঠিক তথ্য প্রদান করতে হবে।',
      'অননুমোদিত অ্যাকাউন্ট অ্যাক্সেসের সন্দেহ হলে Settings-এর মাধ্যমে অবিলম্বে আমাদের জানান।',
    ],
  },
  {
    title: '৪. গ্রহণযোগ্য ব্যবহার',
    content: [
      'আপনি ব্যক্তিগত, অবাণিজ্যিক সামাজিক নেটওয়ার্কিং উদ্দেশ্যে RNS ব্যবহার করতে পারেন।',
      'অবৈধ, ক্ষতিকর, হুমকিমূলক, অপমানজনক বা হয়রানিমূলক কন্টেন্ট পোস্ট করা নিষিদ্ধ।',
      'অন্য ব্যবহারকারীদের হুমকি দেওয়া বা হয়রানি করা নিষিদ্ধ।',
      'জাতি, ধর্ম, লিঙ্গ, জাতীয়তা বা যৌন অভিমুখিতার ভিত্তিতে ঘৃণাসূচক বক্তব্য পোস্ট করা নিষিদ্ধ।',
      'অন্যের পরিচয় অনুকরণ বা নিজের পরিচয় মিথ্যাভাবে উপস্থাপন করা নিষিদ্ধ।',
      'স্প্যাম, অযাচিত পণ্য বিজ্ঞাপন বা প্রতারণা প্রচার নিষিদ্ধ।',
      'RNS প্ল্যাটফর্ম হ্যাক, শোষণ বা ব্যাহত করার চেষ্টা নিষিদ্ধ।',
    ],
  },
  {
    title: '৫. আপনার পোস্ট করা কন্টেন্ট',
    content: [
      'RNS-এ আপনি যে কন্টেন্ট তৈরি এবং পোস্ট করেন তার মালিকানা আপনার কাছেই থাকে।',
      'কন্টেন্ট পোস্ট করে আপনি RNS-কে প্ল্যাটফর্মের মধ্যে অন্য ব্যবহারকারীদের কাছে এটি প্রদর্শন করার লাইসেন্স দিচ্ছেন।',
      'আপনি যা পোস্ট করেন তার একমাত্র দায়িত্ব আপনার।',
      'RNS আপনার ছবি, ভিডিও বা টেক্সট পোস্টের মালিকানা দাবি করে না।',
      'আপনি যে কন্টেন্ট পোস্ট করেন তার অধিকার আপনার থাকতে হবে (কপিরাইট লঙ্ঘন নিষিদ্ধ)।',
    ],
  },
  {
    title: '৬. কন্টেন্ট মডারেশন',
    content: [
      'RNS এই শর্তাবলী লঙ্ঘনকারী কন্টেন্ট সরানোর অধিকার সংরক্ষণ করে।',
      'যে অ্যাকাউন্টগুলো বারবার এই শর্তাবলী লঙ্ঘন করে সেগুলো সাসপেন্ড বা স্থায়ীভাবে নিষিদ্ধ করা হতে পারে।',
      'যেকোনো পোস্ট বা প্রোফাইলে রিপোর্ট ফিচার ব্যবহার করে লঙ্ঘনকারী কন্টেন্ট রিপোর্ট করতে পারেন।',
      'আমরা সকল রিপোর্ট ন্যায্যভাবে পর্যালোচনা করার চেষ্টা করি, কিন্তু মডারেশন সিদ্ধান্ত চূড়ান্ত।',
    ],
  },
  {
    title: '৭. গোপনীয়তা',
    content: [
      'RNS-এর ব্যবহার আমাদের Privacy Policy দ্বারাও নিয়ন্ত্রিত।',
      'আমরা কীভাবে আপনার ডেটা সংগ্রহ ও ব্যবহার করি তা বুঝতে আমাদের Privacy Policy পড়ুন।',
      'RNS ব্যবহার করে আপনি আমাদের Privacy Policy-তেও সম্মত হচ্ছেন।',
    ],
  },
  {
    title: '৮. সেবার প্রাপ্যতা',
    content: [
      'আমরা RNS ২৪/৭ উপলব্ধ রাখার চেষ্টা করি কিন্তু নিরবচ্ছিন্ন সেবার নিশ্চয়তা দিতে পারি না।',
      'আমরা রক্ষণাবেক্ষণ করতে পারি যা সাময়িকভাবে সেবাটি অনুপলব্ধ করতে পারে।',
      'আমরা কোনো ডেটা হারানো বা সেবা বাধার জন্য দায়ী নই।',
      'RNS কোনো ওয়ারেন্টি ছাড়াই "যেমন আছে" ভিত্তিতে প্রদান করা হয়।',
    ],
  },
  {
    title: '৯. অ্যাকাউন্ট বন্ধ',
    content: [
      'আপনি যেকোনো সময় Settings থেকে আপনার অ্যাকাউন্ট মুছতে পারেন।',
      'RNS এই শর্তাবলী লঙ্ঘনকারী অ্যাকাউন্ট সাসপেন্ড বা বন্ধ করতে পারে।',
      'বন্ধের পর, আপনার ডেটা আমাদের Privacy Policy অনুযায়ী মুছে ফেলা হবে।',
      'RNS যেকোনো কারণে যেকাউকে সেবা প্রত্যাখ্যান করার অধিকার সংরক্ষণ করে।',
    ],
  },
  {
    title: '১০. শর্তাবলীর পরিবর্তন',
    content: [
      'RNS বাড়ার সাথে সাথে আমরা এই সেবার শর্তাবলী আপডেট করতে পারি।',
      'উল্লেখযোগ্য পরিবর্তনের ক্ষেত্রে অ্যাপ-এর নোটিফিকেশনের মাধ্যমে ব্যবহারকারীদের জানানো হবে।',
      'পরিবর্তনের পরেও RNS ব্যবহার অব্যাহত রাখার অর্থ হলো আপনি আপডেট হওয়া শর্তাবলী গ্রহণ করেছেন।',
      'এই শর্তাবলী সর্বশেষ মে ২০২৫-এ আপডেট করা হয়েছে।',
    ],
  },
  {
    title: '১১. দায়বদ্ধতার সীমাবদ্ধতা',
    content: [
      'RNS ব্যবহারকারীদের পোস্ট করা কন্টেন্টের জন্য দায়ী নয়।',
      'আমরা কোনো পরোক্ষ, আকস্মিক বা ফলস্বরূপ ক্ষতির জন্য দায়ী নই।',
      'যেকোনো দাবির জন্য আপনার প্রতি আমাদের মোট দায় আপনি আমাদের যে পরিমাণ পরিশোধ করেছেন তার মধ্যে সীমাবদ্ধ (বিনামূল্যের ব্যবহারকারীদের জন্য $০)।',
    ],
  },
  {
    title: '১২. যোগাযোগ',
    content: [
      'এই শর্তাবলী সম্পর্কে প্রশ্নের জন্য, RNS Settings পেজের "Report a Problem" অপশন ব্যবহার করুন।',
      'RNS তৈরি এবং পরিচালনা করেন Rahat, Reach & Network Social-এর Founder ও CEO।',
    ],
  },
];

export default function TermsOfService() {
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
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <h1 className="font-semibold text-base truncate">
              {t('Terms of Service', 'সেবার শর্তাবলী')}
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
              'These Terms of Service govern your use of RNS. Please read them carefully before using our platform.',
              'এই সেবার শর্তাবলী RNS ব্যবহার নিয়ন্ত্রণ করে। আমাদের প্ল্যাটফর্ম ব্যবহার করার আগে অনুগ্রহ করে সতর্কতার সাথে পড়ুন।'
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
              'By creating an account on RNS, you confirm that you have read, understood, and agreed to these Terms of Service and our Privacy Policy.',
              'RNS-এ অ্যাকাউন্ট তৈরি করে আপনি নিশ্চিত করছেন যে আপনি এই সেবার শর্তাবলী এবং আমাদের Privacy Policy পড়েছেন, বুঝেছেন এবং সম্মত হয়েছেন।'
            )}
          </p>
        </div>

        {/* Bottom links */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <Link to="/privacy" className="text-sm text-primary hover:underline font-medium">
            {t('← Privacy Policy', '← গোপনীয়তা নীতি')}
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t('Back to Home', 'হোমে ফিরুন')}
          </Link>
        </div>
      </div>
    </div>
  );
}

