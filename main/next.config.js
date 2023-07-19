/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
}

module.exports = nextConfig
