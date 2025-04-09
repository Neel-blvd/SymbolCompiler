const nextConfig = {
  webpack: (config: { resolve: { extensionAlias: { '.js': string[]; }; }; }) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.js'],
    };
    return config;
  }
};
module.exports = nextConfig;