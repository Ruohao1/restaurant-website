/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/dashboard/:path*',
            destination: '/dashboard/:path*',
          },
        ];
      },
};

export default nextConfig;
