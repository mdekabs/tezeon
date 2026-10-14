import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

/**
 * 404 route — mirrors the legacy `404.html`: oversized gold error code,
 * explanation copy and a square "Return to Home" CTA (gold fill, dark text,
 * hover inverts to dark fill / gold text).
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white px-5 py-24 text-center">
      <div>
        <p
          aria-hidden="true"
          className="text-[120px] font-bold leading-none text-primary"
        >
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-dark sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-[480px] text-base text-muted">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved. Let
          us help you find what you need.
        </p>
        <Link href="/" className={buttonVariants({ size: "lg", className: "mt-8" })}>
          Return to Home
        </Link>
      </div>
    </section>
  );
}