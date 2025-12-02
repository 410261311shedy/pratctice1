import type { NextConfig } from "next";
import pino from "pino";
const nextConfig: NextConfig = {
   /* config options here */
   //this tell next.js not to put these specific items in the main package,keep them separate
   serverExternalPackages: ["pino", "pino-pretty"],

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
