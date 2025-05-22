/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["developers.google.com"],
    remotePatterns: [
      { hostname: 
        "images.pexels.com"
      }
      ,{hostname: "res.cloudinary.com"}
    ],
    
  },
};

export default nextConfig;
