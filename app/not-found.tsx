import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

/** Legacy `404.html` `.not-found-section` (inline styles in that file). */
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white px-5 py-[60px] text-center">
      <div>
        <p aria-hidden="true" className="mb-2.5 text-[120px] leading-none font-bold text-primary max-sm:text-[80px]">
          404
        </p>
        <h1 className="mb-[15px] text-[32px] font-semibold text-dark max-sm:text-2xl">Page Not Found</h1>
        <p className="mx-auto mb-[30px] max-w-[480px] text-base text-[#666]">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved. Let us help you
          find what you need.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary px-10 py-3.5 text-base font-semibold text-dark transition-all duration-300 hover:bg-dark hover:text-primary"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
}
