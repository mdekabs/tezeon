import type { ImageLoaderProps } from "next/image";

/** `<base>/<upload>/` + optional existing transformations + `v123/public_id`. */
const CLOUDINARY_UPLOAD =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/)((?:[^/]+\/)*?)(v\d+\/.+)$/;

/**
 * `next/image` loader that delegates optimisation to Cloudinary: Cloudinary
 * URLs get on-the-fly resizing + automatic format/quality, so each `srcset`
 * entry is a right-sized WebP/AVIF; local `/public` files are served as-is.
 *
 * The resize step is appended *after* any transformations already in the URL
 * (e.g. a crop), because Cloudinary applies chained steps in order.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const match = CLOUDINARY_UPLOAD.exec(src);
  if (!match) return src;

  const [, base, existing, asset] = match;
  const resize = ["f_auto", `q_${quality ?? "auto"}`, "c_limit", `w_${width}`].join(",");
  return `${base}${existing}${resize}/${asset}`;
}
