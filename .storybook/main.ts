import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	framework: "@storybook/react-vite",
	stories: ["../app/**/*.stories.@(ts|tsx)"],
	viteFinal(config) {
		return config;
	},
};

export default config;
