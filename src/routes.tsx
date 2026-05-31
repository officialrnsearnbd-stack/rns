import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Loading = () => <div className="flex h-screen w-full items-center justify-center">Loading...</div>;

// Landing
const Landing = lazy(() => import('./pages/Landing'));

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Onboarding = lazy(() => import('./pages/auth/Onboarding'));

// User Pages
const Home = lazy(() => import('./pages/user/Home'));
const Search = lazy(() => import('./pages/user/Search'));
const Explore = lazy(() => import('./pages/user/Explore'));
const CreatePost = lazy(() => import('./pages/user/CreatePost'));
const Stories = lazy(() => import('./pages/user/Stories'));
const Chat = lazy(() => import('./pages/user/Chat'));
const Friends = lazy(() => import('./pages/user/Friends'));
const Profile = lazy(() => import('./pages/user/Profile'));
const EditProfile = lazy(() => import('./pages/user/EditProfile'));
const Settings = lazy(() => import('./pages/user/Settings'));
const Notifications = lazy(() => import('./pages/user/Notifications'));
const SinglePost = lazy(() => import('./pages/user/SinglePost'));
const SavedPosts = lazy(() => import('./pages/user/SavedPosts'));
const Reels = lazy(() => import('./pages/user/Reels'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ContentModeration = lazy(() => import('./pages/admin/ContentModeration'));
const VerificationRequests = lazy(() => import('./pages/admin/VerificationRequests'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const Broadcast = lazy(() => import('./pages/admin/Broadcast'));
const ActivityLogs = lazy(() => import('./pages/admin/ActivityLogs'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

const NotFound = lazy(() => import('./pages/NotFound'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Suspense fallback={<Loading />}><Landing /></Suspense>,
  },
  {
    path: '/home',
    element: <Suspense fallback={<Loading />}><Home /></Suspense>,
  },
  {
    path: '/login',
    element: <Suspense fallback={<Loading />}><Login /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={<Loading />}><Register /></Suspense>,
  },
  {
    path: '/onboarding',
    element: <Suspense fallback={<Loading />}><Onboarding /></Suspense>,
  },
  {
    path: '/search',
    element: <Suspense fallback={<Loading />}><Search /></Suspense>,
  },
  {
    path: '/explore',
    element: <Suspense fallback={<Loading />}><Explore /></Suspense>,
  },
  {
    path: '/create',
    element: <Suspense fallback={<Loading />}><CreatePost /></Suspense>,
  },
  {
    path: '/stories',
    element: <Suspense fallback={<Loading />}><Stories /></Suspense>,
  },
  {
    path: '/chat',
    element: <Suspense fallback={<Loading />}><Chat /></Suspense>,
  },
  {
    path: '/chat/:id',
    element: <Suspense fallback={<Loading />}><Chat /></Suspense>,
  },
  {
    path: '/profile/:username',
    element: <Suspense fallback={<Loading />}><Profile /></Suspense>,
  },
  {
    path: '/profile/edit',
    element: <Suspense fallback={<Loading />}><EditProfile /></Suspense>,
  },
  {
    path: '/settings',
    element: <Suspense fallback={<Loading />}><Settings /></Suspense>,
  },
  {
    path: '/notifications',
    element: <Suspense fallback={<Loading />}><Notifications /></Suspense>,
  },
  {
    path: '/post/:id',
    element: <Suspense fallback={<Loading />}><SinglePost /></Suspense>,
  },
  {
    path: '/saved',
    element: <Suspense fallback={<Loading />}><SavedPosts /></Suspense>,
  },
  {
    path: '/friends',
    element: <Suspense fallback={<Loading />}><Friends /></Suspense>,
  },
  {
    path: '/reels',
    element: <Suspense fallback={<Loading />}><Reels /></Suspense>,
  },
  // Admin Routes
  {
    path: '/admin',
    element: <Suspense fallback={<Loading />}><AdminDashboard /></Suspense>,
  },
  {
    path: '/admin/users',
    element: <Suspense fallback={<Loading />}><UserManagement /></Suspense>,
  },
  {
    path: '/admin/content',
    element: <Suspense fallback={<Loading />}><ContentModeration /></Suspense>,
  },
  {
    path: '/admin/verification',
    element: <Suspense fallback={<Loading />}><VerificationRequests /></Suspense>,
  },
  {
    path: '/admin/reports',
    element: <Suspense fallback={<Loading />}><Reports /></Suspense>,
  },
  {
    path: '/admin/broadcast',
    element: <Suspense fallback={<Loading />}><Broadcast /></Suspense>,
  },
  {
    path: '/admin/logs',
    element: <Suspense fallback={<Loading />}><ActivityLogs /></Suspense>,
  },
  {
    path: '/admin/analytics',
    element: <Suspense fallback={<Loading />}><Analytics /></Suspense>,
  },
  {
    path: '/privacy',
    element: <Suspense fallback={<Loading />}><PrivacyPolicy /></Suspense>,
  },
  {
    path: '/terms',
    element: <Suspense fallback={<Loading />}><TermsOfService /></Suspense>,
  },
  {
    path: '/about',
    element: <Suspense fallback={<Loading />}><AboutUs /></Suspense>,
  },
  {
    path: '*',
    element: <Suspense fallback={<Loading />}><NotFound /></Suspense>,
  }
];
