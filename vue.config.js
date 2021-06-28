module.exports = {
	publicPath: './',
	css: {
		loaderOptions: {
			sass: {
				implementation: require("sass"), // This line must in sass option
			},
		},
	},
	productionSourceMap: false, //关闭生产环境map
	//反向代理
	devServer: {
		overlay: {
			// 让浏览器 overlay 同时显示警告和错误
			warnings: true,
			errors: true,
		},
		host: "localhost",
		port: 8080, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置后自动启动浏览器
		hotOnly: true, // 热更新
		// 配置跨域处理
		proxy: {
			//配置多个代理
			"/testIp": {
				target: "http://197.0.0.1:8088",
				changeOrigin: true,
				ws: true, //websocket支持
				secure: false,
				pathRewrite: {
					"^/testIp": "/",
				},
			},
			"/elseIp": {
				target: "http://197.0.0.2:8088",
				changeOrigin: true,
				//ws: true,//websocket支持
				secure: false,
				pathRewrite: {
					"^/elseIp": "/",
				},
			},
		},
	},
};
