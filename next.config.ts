import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'image.tmdb.org',
        pathname:'**',
      },
    ],
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
};

export default nextConfig;
