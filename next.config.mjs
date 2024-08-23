/** @type {import('next').NextConfig} */
const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',');
const nextConfig = {
    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        API_BASE_URL: process.env.API_BASE_URL,
        ADM_CREATOR_ID: process.env.ADM_CREATOR_ID,
        ADM_ORG_ID: process.env.ADM_ORG_ID,
    },
    images: {
        domains: imageDomains,
        remotePatterns: [
          {
            protocol: "https",
            hostname: '**',
            port: '',
            pathname: '**',
          },
        ],
      },
    
};

export default nextConfig;
