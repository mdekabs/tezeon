import type { LucideIcon } from "lucide-react";

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface TopBarItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  icon: LucideIcon;
  value: number;
  label: string;
}

export interface Service {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface SocialLink {
  platform: "twitter" | "facebook" | "youtube" | "instagram" | "linkedin";
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  alt: string;
  socials?: readonly SocialLink[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  logo: string;
  logoAlt: string;
}

export type GalleryCategory =
  | "drilling"
  | "filtration"
  | "construction"
  | "plumbing"
  | "video";

export type GalleryFilter = "all" | GalleryCategory;

export interface GalleryItem {
  title: string;
  description: string;
  categories: readonly GalleryCategory[];
  /** Still image items expose `image` (lightbox target). */
  image?: string;
  alt?: string;
  /** Video items expose `video` (modal target) plus an optional poster frame. */
  video?: string;
  poster?: string;
}

export type ProjectStatus = "completed" | "ongoing" | "coming-soon";

export type PortfolioFilter = "all" | ProjectStatus;

export interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  alt: string;
  status: ProjectStatus;
}

/* --------------------------------------------------------------------------
 * Chat assistant contracts
 * ------------------------------------------------------------------------ */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
}

export interface ChatQuickReply {
  id: string;
  label: string;
}

/**
 * Transport abstraction for the floating assistant. The default local adapter
 * resolves answers from a keyword table; swapping in an LLM/webhook only
 * requires providing a different `ChatAdapter` implementation — no UI or
 * state changes.
 */
export interface ChatAdapter {
  send(message: string, history: readonly ChatMessage[]): Promise<string>;
}

export interface HeroCta {
  label: string;
  href: string;
  external: boolean;
}

export interface HeroSlide {
  videoSrc: string;
  poster?: string;
  sub: string;
  headingTop: string;
  headingBottom: string;
  cta: HeroCta;
}

export interface CollageItem {
  image: string;
  alt: string;
  label: string;
  icon: LucideIcon;
  /** The first tile spans two rows, mirroring `.collage-tall` in the legacy CSS. */
  tall?: boolean;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormValues {
  email: string;
}