/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["developers.google.com"],
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // 308 redirect
      },
    ];
  },
};

export default nextConfig;
