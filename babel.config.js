module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'transform-inline-environment-variables',
        {
          include: ['NODE_ENV', 'EXPO_PUBLIC_SITE_URI'],
        },
      ],
    ],
  };
};
