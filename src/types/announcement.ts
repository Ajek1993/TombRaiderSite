/**
 * Announcement type definitions
 */

export type AnnouncementStatus = "scheduled" | "live" | "completed";

export type Platform = "TikTok" | "YouTube" | "Twitch";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  platform: Platform;
  platformLink: string;
  features: string[];
  status: AnnouncementStatus;
  thumbnail?: string;
}

export interface AnnouncementFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  platform: string;
  platformLink: string;
  features: string;
  status: string;
  thumbnail: string;
}

export interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: AnnouncementStatus) => void;
}
