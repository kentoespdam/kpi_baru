/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.node$/,
			use: "node-loader",
		});
		config.resolve.alias.canvas = false;
		config.resolve.alias.encoding = false;
		config.resolve.fallback = {
			fs: false,
		};
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
				source: "/master/indikator",
				destination: "/master/kpi",
				permanent: true,
			},
			{
				source: "/master/indikator/:slug",
				destination: "/master/kpi",
				permanent: true,
			},
			{
				source: "/master/uraian",
				destination: "/master/kpi",
				permanent: true,
			},
			{
				source: "/master/uraian/:slug",
				destination: "/master/kpi",
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
