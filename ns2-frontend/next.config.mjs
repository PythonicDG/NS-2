/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nsbackend.strangled.net", // Your GCP backend server
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com", // GitHub assets domain
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ns2-infotech-backend-production.up.railway.app",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
