import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  
  compress: true,
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' https://www.google-analytics.com https://secure.mlstatic.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' https://res.cloudinary.com data:;
              font-src 'self';
              connect-src 'self' https://api.mercadopago.com;
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
            `.replace(/\n\s+/g, ' ').trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  }
};

export default nextConfig;