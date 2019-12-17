const path = require('path');

module.exports = {
  chainWebpack: config => config
    .module.rule('svg')
    .uses.clear().end()
    .oneOf('icon-component')
    .resourceQuery(/icon-component/)
    .use('babel-loader')
    .loader('babel-loader')
    .options({ configFile: false, presets: ['@babel/preset-env'] })
    .end()
    .use('vue-svg-loader')
    .loader('vue-svg-loader')
    .options({
      svgo: {
        plugins: [{
          addClassesToSVGElement: {
            type: 'full',
            fn(data, options, extra) {
              const svg = data.content[0];
              svg.class.add('icon', path.basename(extra.path, '.svg'));
              return data;
            },
          },
        }],
      },
    })
    .end()
    .end()
    .oneOf('default')
    .use('svg-url-loader')
    .loader('svg-url-loader')
    .options({
      noquotes: true,
      limit: 4096,
      name: 'img/[name].[hash:8].[ext]',
    })
    .end()
    .use('svgo-loader')
    .loader('svgo-loader')
    .end(),
};
