/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    domains: ["images.unsplash.com", "png.pngtree.com"],
  },
};

export default nextConfig;
