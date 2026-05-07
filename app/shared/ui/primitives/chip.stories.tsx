import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Chip } from "./chip";

const meta = {
	args: {
		onRemove: fn(),
	},
	component: Chip,
	title: "Primitives/Chip",
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "business",
	},
};

export const Country: Story = {
	args: {
		label: "미국",
		variant: "country",
	},
};

export const Language: Story = {
	args: {
		label: "TOEFL",
		value: "90",
		variant: "language",
	},
};
