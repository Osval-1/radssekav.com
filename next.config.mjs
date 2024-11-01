/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const nextConfig = {
  basePath: "/react/porto/demo14",
  trailingSlash: isProduction,
};

export default nextConfig;
