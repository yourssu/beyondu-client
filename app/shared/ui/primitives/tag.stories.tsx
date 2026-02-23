import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "./tag";

const meta = {
	args: {
		programType: "학부",
	},
	component: Tag,
	title: "Primitives/Tag",
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GKS: Story = {
	args: { programType: "GKS" },
};
