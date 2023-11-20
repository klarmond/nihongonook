/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {
        appDir: true,
        serverActions: true,
        serverComponentsExternalPackages:["mongoose"],
        
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    }
}

module.exports = nextConfig
