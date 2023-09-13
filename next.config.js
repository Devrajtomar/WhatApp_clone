/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "res-console.cloudinary.com"],
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
