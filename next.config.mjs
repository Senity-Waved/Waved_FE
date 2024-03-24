/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
    ],
    domains: ['wavedstorage.blob.core.windows.net'],
  },
};

export default nextConfig;
