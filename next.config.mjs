/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["img.clerk.com", "google.com"],
    },

    env: {
        FRONTEND_URL: "https://poxyurl.in",
        BACKEND_URL: "https://api.poxyurl.in",
    },
};

export default nextConfig;
