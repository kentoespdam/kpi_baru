/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.node$/,
			use: "node-loader",
		});
		config.resolve.alias.canvas = false;
		config.resolve.alias.encoding = false;
		return config;
	},
	async redirects() {
		return [
			{
				source: "/master",
				destination: "/master/level",
				permanent: true,
			},
			{
				source: "/bridge",
				destination: "/bridge/kpi",
				permanent: true,
			},
			{
				source: "/trans",
				destination: "/trans/kpi",
				permanent: true,
			},
			{
				source: "/trans/kpi/file",
				destination: "/trans/kpi",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
