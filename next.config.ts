import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
     which Render (Static Site) publishes as-is. */
  output: "export",
  /* `/about` → `about/index.html`, so clean URLs resolve on any static host. */
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  images: {
    /* No image server in a static export — Cloudinary resizes on the fly instead. */
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
