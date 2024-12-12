/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    NAME: process.env.NAME,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    EMAIL: process.env.EMAIL,
    TELEPHONE: process.env.TELEPHONE,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    INSTAGRAM: process.env.INSTAGRAM,
    GTM_CODE: process.env.GTM_CODE,
  },
  images: {
    domains: [
      "scontent.cdninstagram.com",
      "api.hobbrandgroup.croonus.com",
      "video.cdninstagram.com",
      "192.168.1.223",
    ],
    minimumCacheTTL: 60 * 60 * 12 * 90,
  },
};

module.exports = nextConfig;
