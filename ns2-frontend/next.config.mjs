// Local installations also run `next build` / `next start`. Allow Django's
// loopback image origin when it is the configured backend, in either mode.
const backendUrl = new URL(
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://mia-backend.mooo.com"
);
const isLocalBackend = ["localhost", "127.0.0.1", "[::1]"].includes(
  backendUrl.hostname
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    // Image optimization enabled for LCP improvement
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    // Next.js 16 blocks private IP images even with matching remotePatterns.
    dangerouslyAllowLocalIP: isLocalBackend,
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nsbackend.strangled.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ns2-infotech-backend-production.up.railway.app",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "mia-backend.mooo.com",
        port: "",
        pathname: "/**",
      },
      ...(isLocalBackend
        ? [...new Set([backendUrl.hostname, "localhost", "127.0.0.1"])].map(
            (hostname) => ({
              protocol: backendUrl.protocol.slice(0, -1),
              hostname,
              port: backendUrl.port,
              pathname: "/media/**",
            })
          )
        : []),
    ],

  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
