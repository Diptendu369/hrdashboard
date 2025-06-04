// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: 'export',
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'randomuser.me',
      'api.dicebear.com'
    ],
  },
};

module.exports = nextConfig;