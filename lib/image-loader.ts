import type { ImageLoaderProps } from "next/image";

const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/)(.+)$/;

/**
 * `next/image` loader for the static export (no server-side optimiser).
 * Cloudinary URLs get on-the-fly resizing + automatic format/quality, so each
 * `srcset` entry is a right-sized WebP/AVIF; local `/public` files are served
 * as-is.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const match = CLOUDINARY_UPLOAD.exec(src);
  if (!match) return src;

  const [, base, asset] = match;
  const transforms = ["f_auto", `q_${quality ?? "auto"}`, "c_limit", `w_${width}`].join(",");
  return `${base}${transforms}/${asset}`;
}
