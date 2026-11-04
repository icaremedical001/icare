import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows testing this dev server from other devices on the LAN
  // (e.g. the machine 10.105.29.22) without it blocking HMR requests.
  allowedDevOrigins: ["10.105.29.22"],
};

export default nextConfig;
