import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";

const meta = {
	title: "Primitives/Checkbox",
	component: Checkbox,
	args: {
		label: "후기 보고서 필수 여부",
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
	args: { checked: true },
};
