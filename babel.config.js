module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					extentions: [".tsx", ".ts", ".js", ".json"],
				},
			],
			"react-native-reanimated/plugin",
		],
		env: {
			production: {
				plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
			},
		},
	};
};
