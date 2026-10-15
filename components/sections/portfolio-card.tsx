"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";

import { LightboxTrigger } from "@/components/shared/lightbox";
import { cn } from "@/lib/utils";

export interface PortfolioCardProps {
  title: string;
  description: string;
  image?: string;
  alt?: string;
  video?: string;
  poster?: string;
  /** Position of `image` in the surrounding `<LightboxGroup>`. */
  lightboxIndex?: number;
  onPlayVideo?: () => void;
}

/**
 * Gallery card — legacy `.portfolio-warp` (style.css:2162-2251, 2850-2918): 250px media
 * slot with a navy hover overlay, navy title strip and a white "+" tile.
 * Video items show a pulsing gold play disc; projects without media show a
 * "Coming Soon" frame instead of a photo.
 */
export function PortfolioCard({
  title,
  description,
  image,
  alt,
  video,
  poster,
  lightboxIndex,
  onPlayVideo,
}: PortfolioCardProps) {
  const hasVideo = Boolean(video && onPlayVideo);

  return (
    <div
      className="group relative mb-[30px] w-full overflow-hidden rounded-md text-center transition-[transform,box-shadow] duration-[340ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform hover:-translate-y-2.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.22)]"
    >
      <div className={cn("relative h-[250px] overflow-hidden", image && "animate-shimmer shimmer-bg")}>
        {hasVideo ? (
          <button
            type="button"
            onClick={onPlayVideo}
            aria-label={`Play ${title} video`}
            className="block size-full"
          >
            {poster ? (
              <Image src={poster} alt="" fill sizes="(min-width: 1200px) 255px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
            ) : null}
            <span className="absolute inset-0 flex items-center justify-center bg-dark/55 p-[30px] transition-colors duration-500 group-hover:bg-dark/70">
              <span className="gallery-play flex size-[62px] items-center justify-center rounded-full bg-primary transition-[transform,background] duration-300 group-hover:scale-[1.15] group-hover:bg-white max-md:size-[50px]">
                <FaPlay aria-hidden="true" className="ml-1 text-xl text-dark max-md:text-base" />
              </span>
            </span>
          </button>
        ) : image ? (
          <>
            <Image
              src={image}
              alt={alt ?? title}
              width={360}
              height={250}
              sizes="(min-width: 1200px) 255px, (min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="relative z-[1] block h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 z-[2] flex items-center justify-center bg-dark/70 p-[30px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="m-0 text-white">{description}</p>
            </div>
          </>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,#030f27_0%,#0a1e3d_100%)] p-[30px]">
            <span className="text-2xl font-bold tracking-[2px] text-primary uppercase">Coming Soon</span>
            <span className="text-sm text-white/70">{description}</span>
          </div>
        )}
      </div>

      <div className="flex h-[60px] items-center overflow-hidden bg-dark">
        <h3
          className={cn(
            "m-0 truncate pr-[15px] pl-[25px] text-center text-xl font-bold text-primary",
            image || hasVideo ? "w-[calc(100%-60px)]" : "w-full",
          )}
        >
          {title}
        </h3>
        {hasVideo ? (
          <button
            type="button"
            onClick={onPlayVideo}
            aria-label={`Play ${title} video`}
            className="flex size-[60px] shrink-0 items-center justify-center bg-white pt-[3px] text-2xl text-dark transition-all duration-300 group-hover:bg-primary group-hover:text-white"
          >
            <FaPlay aria-hidden="true" />
          </button>
        ) : image && lightboxIndex !== undefined ? (
          <LightboxTrigger
            index={lightboxIndex}
            label={`View ${title} image`}
            className="bg-white text-dark group-hover:bg-primary group-hover:text-white"
          />
        ) : null}
      </div>
    </div>
  );
}
