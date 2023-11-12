/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/monthly-budgets",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
