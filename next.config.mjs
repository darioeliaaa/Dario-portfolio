/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  cacheComponents: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // SAMEORIGIN (not DENY) so the site can frame its own documents;
          // still blocks other sites from framing us (clickjacking protection).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // NOTE: no custom Cache-Control for /_next/static — Next already serves
      // those immutable in production, and overriding it breaks dev HMR
      // (Next 16 warns about exactly this).
    ];
  },
};

export default nextConfig;
