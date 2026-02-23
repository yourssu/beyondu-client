import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./select";

const options = [
	{ value: "toefl", label: "TOEFL" },
	{ value: "ielts", label: "IELTS" },
	{ value: "toeic", label: "TOEIC" },
	{ value: "jlpt", label: "JLPT" },
];

const meta = {
	title: "Primitives/Select",
	component: Select,
	args: {
		options,
		placeholder: "선택",
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
	args: { value: "toefl" },
};

export const Error: Story = {
	args: { error: true },
};
