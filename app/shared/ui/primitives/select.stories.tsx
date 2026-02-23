import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./select";

const options = [
	{ label: "TOEFL", value: "toefl" },
	{ label: "IELTS", value: "ielts" },
	{ label: "TOEIC", value: "toeic" },
	{ label: "JLPT", value: "jlpt" },
];

const meta = {
	args: {
		options,
		placeholder: "선택",
	},
	component: Select,
	title: "Primitives/Select",
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
	args: { value: "toefl" },
};

export const WithError: Story = {
	args: { error: true },
};
