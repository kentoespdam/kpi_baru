/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.node$/,
			use: "node-loader",
		});
		config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
		return config;
	},
	async redirects() {
		return [
			{
				source: "/bridge",
				destination: "/",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
