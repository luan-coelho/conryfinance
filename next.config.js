/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination:'/dashboard',
            permanent: true,
            basePath:false
          },
        ]
      },
}

module.exports = nextConfig
