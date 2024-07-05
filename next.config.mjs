/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    domains: ["images.unsplash.com", "png.pngtree.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
