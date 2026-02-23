import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
	args: {
		children: "교환학생",
	},
	component: Badge,
	title: "Primitives/Badge",
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {};

export const Neutral: Story = {
	args: { variant: "neutral" },
};
