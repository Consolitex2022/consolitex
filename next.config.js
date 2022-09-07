/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://consolitex.org/SISGACI', 'https://consolitex.org', 'https://consolitex.org/img.php', 'consolitex.org', 'http://consolitex.org', "", "localhost", "http://localhost", "http://localhost:3000"],
  },
}

module.exports = nextConfig
