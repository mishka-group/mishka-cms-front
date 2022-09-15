/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    api_url: 'http://localhost:4001/api',
  }
}

module.exports = nextConfig
