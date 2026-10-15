import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

import type { SocialLink } from "@/types";

/** Font Awesome 5 brand marks — the exact glyphs used by the legacy template. */
const ICONS: Record<SocialLink["platform"], IconType> = {
  twitter: FaTwitter,
  facebook: FaFacebookF,
  youtube: FaYoutube,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

interface SocialIconProps {
  platform: SocialLink["platform"];
  className?: string;
}

export function SocialIcon({ platform, className }: SocialIconProps) {
  const Icon = ICONS[platform];
  return <Icon aria-hidden="true" className={className} />;
}
