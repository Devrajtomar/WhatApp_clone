/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    // Increase bodyParser limit to handle larger file uploads
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

module.exports = nextConfig;
