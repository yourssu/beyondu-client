import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "./tag";

const meta = {
	title: "Primitives/Tag",
	component: Tag,
	args: {
		exchangeType: "교환학생",
	},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExchangeOnly: Story = {};

export const WithProgram: Story = {
	args: { program: "GKS" },
};
