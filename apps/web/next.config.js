const trueEnv = ["true", "1", "yes"];
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? "false"
);
const isProd = process.env.NODE_ENV === "production";
const tmModules = [
  // for legacy browsers support (only in prod)
  ...(isProd ? [] : []),
  // ESM only packages are not yet supported by NextJs if you're not
  // using experimental experimental esmExternals
  // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
  // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
  // @link https://github.com/vercel/next.js/issues/23725
  // @link https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
  ...[
    // ie: newer versions of https://github.com/sindresorhus packages
  ],
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  swcMinify: true,
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
    domains: [],
  },
  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
    tsconfigPath: "./tsconfig.json",
  },
};

module.exports = nextConfig;
