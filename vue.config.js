module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000", //服务端地址
          ws: true, //如果要代理 websockets，配置这个参数
          changeOrigin: true, // 允许跨域
          pathRewrite: {
            "^/api": "", // 标识替换，使用 '/api' 代替真实的接口地址
          },
        },
      },
    },
  };
  