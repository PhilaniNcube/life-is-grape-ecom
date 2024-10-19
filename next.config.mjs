/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quiet-caterpillar-834.convex.cloud',
      },
    ],
  },
}

export default nextConfig;
