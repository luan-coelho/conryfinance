/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/monthly-budgets",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
