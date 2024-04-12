import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const pwaConfig = withPWA({
  dest: 'public',
  disable: false,
  runtimeCaching: [],
});

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
      {
        protocol: 'https',
        hostname: 'wavedstorage.blob.core.windows.net',
        port: '',
      },
    ],
  },
};

export default pwaConfig(nextConfig);
