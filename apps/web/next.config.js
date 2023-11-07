const trueEnv = ["true", "1", "yes"];
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? "false"
);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    outputFileTracingRoot: undefined,
    esmExternals: true,
    externalDir: true,
  },
  images: {
    loader: "default",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    disableStaticImages: false,
    minimumCacheTTL: 604800,
    domains: ["dd.b.pvp.net"],
  },
  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
    tsconfigPath: "./tsconfig.json",
  },
  i18n: {
    locales: [
      "default",
      "de-de",
      "en-us",
      "es-es",
      "es-mx",
      "fr-fr",
      "it-it",
      "ja-jp",
      "ko-kr",
      "pl-pl",
      "pt-br",
      "ru-ru",
      "th-th",
      "tr-tr",
      "vi-vn",
      "zh-tw",
    ],
    defaultLocale: "default",
  },
  trailingSlash: true,
};

module.exports = nextConfig;
