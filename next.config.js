/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'https://consolitex.org/SISGACI',
      'images.consolitex.org',
      'http://images.consolitex.org',
      'https://images.consolitex.org',
      'https://images.consolitex.org/newImg.php',
      'https://consolitex.org',
      'https://consolitex.org/newImg.php',
      'https://consolitex.org/img.php',
      'https://consolitex.org/img2.php',
      'consolitex.org',
      'http://consolitex.org',
      "",
      "localhost",
      "http://localhost",
      "http://localhost:3000"],
  },
}

module.exports = nextConfig
