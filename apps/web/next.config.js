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
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    reactRoot: true,
    runtime: "undefined",
    serverComponents: false,
    outputStandalone: false,
    outputFileTracingRoot: undefined,
    esmExternals: true,
    externalDir: true,
  },
  images: {
    loader: "default",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    disableStaticImages: false,
    minimumCacheTTL: 60,
    domains: ["dd.b.pvp.net"],
  },
  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
    tsconfigPath: "./tsconfig.json",
  },
  i18n: {
    locales: ["en-US", "pt-BR"],
    defaultLocale: "en-US",
    localeDetection: true,
  },
};

module.exports = nextConfig;
