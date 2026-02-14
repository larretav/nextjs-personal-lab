/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media3.giphy.com",
      }
    ]
  }
};

module.exports = nextConfig;
