/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: process.env.NODE_ENV === "production" ? "" : undefined,
    experimental: {
      appDir: true,
    },
    images: {
      unoptimized: true,
    },
    reactStrictMode: true,
  };
  
  export default nextConfig;
