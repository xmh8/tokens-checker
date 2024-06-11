export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  accent_color: number | null;
  global_name: string;
  avatar_decoration_data: {
    asset: string;
    sku_id: string;
  } | null;
  banner_color: number | null;
  clan: any;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
  phone: string | null;
  nsfw_allowed: boolean;
  premium_usage_flags: number;
  linked_users: any[];
  purchased_flags: number;
  bio: string;
  authenticator_types: number[];
  created_at?: number;
}
