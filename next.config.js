/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/.well-known/ai-plugin.json',
        destination: '/api/openapi_plugin',
      },
      {
        source: '/openapi.yaml',
        destination: '/api/openapi_yaml',
      },
    ];
  },
}

module.exports = nextConfig
