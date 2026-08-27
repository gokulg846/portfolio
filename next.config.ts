import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix:
    process.env.GITHUB_PAGES_BUILD === "true" ? "/portfolio" : undefined,
};

export default nextConfig;
