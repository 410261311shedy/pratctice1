import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   //if
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "img.freepik.com",
            port: "",
         },
         {
            protocol: "https",
            hostname: "png.pngtree.com",
            port: "",
         },
      ],
   },
};

export default nextConfig;
