import { User } from '@supabase/supabase-js';

export type UserRole = 'user' | 'admin';
export type PostType = 'text' | 'photo' | 'video';
export type PostPrivacy = 'public' | 'friends_only';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  dob: string | null;
  is_private: boolean;
  is_verified: boolean;
  is_suspended: boolean;
  is_blocked: boolean;
  suspended_until: string | null;
  suspension_reason: string | null;
  role: UserRole;
  online_at: string | null;
  notification_prefs: { likes: boolean; comments: boolean; follows: boolean; messages: boolean };
  created_at: string;
}

export interface Post {
  id: string;
  owner_id: string;
  post_type: PostType;
  image_url: string | null;
  text_content: string | null;
  text_background_color: string | null;
  caption: string | null;
  privacy: PostPrivacy;
  is_draft: boolean;
  created_at: string;
  profiles?: Profile;
  likes_count?: { count: number }[];
  comments_count?: { count: number }[];
  is_liked?: boolean;
  is_saved?: boolean;
}

export interface Story {
  id: string;
  owner_id: string;
  image_url: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  expires_at: string;
  created_at: string;
  profiles?: Profile;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface FollowRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  sender?: Profile;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_seen: boolean;
  created_at: string;
  // reply-to
  reply_to_id: string | null;
  reply_to_content: string | null;
  reply_to_sender_username: string | null;
  // forward
  is_forwarded: boolean;
  forwarded_from_username: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  actor_id: string;
  type: 'like' | 'comment' | 'follow' | 'request' | 'request_approval' | 'friend_request' | 'friend_accepted';
  post_id: string | null;
  is_read: boolean;
  created_at: string;
  actor?: Profile;
  post?: Post;
}

export interface VerificationRequest {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  profiles?: Profile;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_id: string;
  target_type: 'user' | 'post' | 'story';
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: string;
  reporter?: Profile;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  action: string;
  details: any;
  created_at: string;
  admin?: Profile;
}

export interface Save {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Broadcast {
  id: string;
  admin_id: string;
  message: string;
  created_at: string;
  admin?: Profile;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
}

export interface GroupChat {
  id: string;
  name: string;
  created_by: string | null;
  avatar_url: string | null;
  created_at: string;
  members?: GroupMember[];
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
  profiles?: Profile;
}

export interface GroupMessage {
  id: string;
  group_id: string;
  sender_id: string | null;
  content: string;
  created_at: string;
  profiles?: Profile;
}

export type FriendshipStatus = 'pending' | 'accepted' | 'blocked';

export interface Friendship {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: FriendshipStatus;
  created_at: string;
  sender?: Profile;
  receiver?: Profile;
}

export interface Block {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
  blocker?: Profile;
  blocked?: Profile;
}
