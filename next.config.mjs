import withPWA from 'next-pwa';

const prod = process.env.NODE_ENV === 'production';

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

export default withPWA({
  dest: 'public',
  disable: prod ? false : true,
})(nextConfig);
