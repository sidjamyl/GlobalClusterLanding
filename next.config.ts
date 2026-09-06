import type { NextConfig } from "next";
const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/2025/01/fiche-salarie-V2.png",
        destination: "/assets/payroll.webp",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2025/01/liste-des-salaries-1.png",
        destination: "/assets/payroll.webp",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          ...(process.env.SITE_INDEXABLE === "true"
            ? []
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
};
export default config;
