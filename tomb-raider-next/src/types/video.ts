/**
 * Video type definitions
 */

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
  publishedAtRaw: string;
  embedUrl: string;
  videoUrl: string;
  isShort?: boolean;
}

export interface ChannelInfo {
  title: string;
  avatar: string;
  subscriberCount: string;
  description: string;
}

export interface PlaylistInfo {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
}

export interface VideoCardProps {
  video: Video;
  variant?: "default" | "highlight" | "small";
  isNew?: boolean;
  isPopular?: boolean;
  onWatch?: (video: Video) => void;
}

export interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}
