import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./card";

const meta = {
	args: {
		children: <div className="p-6">카드 내용</div>,
	},
	component: Card,
	title: "Primitives/Card",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bordered: Story = {
	args: { variant: "bordered" },
};
