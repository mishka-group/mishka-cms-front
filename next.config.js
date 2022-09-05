/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    api_url: 'https://api.example.com/api',
  }
}

module.exports = nextConfig
