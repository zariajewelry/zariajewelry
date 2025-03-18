import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  
  compress: true,

  images: {
    domains: ['i.ibb.co', 
      'acdn-us.mitiendanube.com', 
      'ar.isadoraonline.com', 
      'www.ginifab.com', 
      'www.wolfandmoon.com'], 
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://secure.mlstatic.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' https://res.cloudinary.com data:;
              font-src 'self';
              connect-src 'self' https://api.mercadopago.com;
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
            `.replace(/\n\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  }
};

export default nextConfig;