import "./src/env.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        yjs: path.join(__dirname, "./node_modules/yjs"),
      };
    }
    return config;
  },
  // 添加性能优化
  experimental: {
    // 现有配置
    useCache: true,
    
    // 添加新配置
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    optimizeServerReact: true,
  },
  
  // 启用压缩
  compress: true,
  
  // 添加字体优化
  optimizeFonts: true,
};

export default config;
