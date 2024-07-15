/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["img.clerk.com", "google.com"],
    },

    env: {
        FRONTEND_URL: "http://localhost:3000",
        BACKEND_URL: "http://localhost:8000",
    },
};

export default nextConfig;
