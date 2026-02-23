import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
	title: "Primitives/Badge",
	component: Badge,
	args: {
		children: "교환학생",
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {};

export const Neutral: Story = {
	args: { variant: "neutral" },
};
