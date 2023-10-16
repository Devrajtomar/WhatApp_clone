/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
  },
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
