import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";

import { Button } from "./button";

const meta = {
	title: "Primitives/Button",
	component: Button,
	args: {
		children: "버튼",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
	args: { variant: "outline" },
};

export const Large: Story = {
	args: { size: "lg" },
};

export const WithIcon: Story = {
	args: { rightIcon: <ArrowRight className="size-5" /> },
};

export const FullWidth: Story = {
	args: { fullWidth: true },
};

export const Disabled: Story = {
	args: { disabled: true },
};
