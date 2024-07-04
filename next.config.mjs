/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'storage.googleapis.com' }, {hostname: 'maps.googleapis.com'}]
    }
};

export default nextConfig;
