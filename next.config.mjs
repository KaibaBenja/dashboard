/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com'], 
        remotePatterns: [
            { hostname: "s3-dashboard-bucket.s3.sa-east-1.amazonaws.com", protocol: "https" },
        ],
    },
};

export default nextConfig;
