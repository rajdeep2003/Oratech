module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@screens': './src/components/screens',
            '@navigation': './src/navigation',
            '@services': './src/services',
            '@store': './index',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@styles': './src/styles',
            '@assets': './src/assets',
            '@config': './src/config',
            '@context': './src/context',
            '@types': './src/types',
            '@shared': '../../packages/shared'
          },
        },
      ],
    ],
  };
};
