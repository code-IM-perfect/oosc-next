/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(glsl|vs|fs)$/,
        use: ["raw-loader", "glslify-loader"],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  