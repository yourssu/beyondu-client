import type { Meta, StoryObj } from "@storybook/react-vite";

import { Combobox } from "./combobox";

const suggestions = ["경영학과", "컴퓨터학부", "경제학과", "국제통상학과", "영어영문학과"];

const meta = {
	title: "Primitives/Combobox",
	component: Combobox,
	args: {
		suggestions,
		placeholder: "예: 경영학과, 컴퓨터학부",
	},
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSuggestions: Story = {
	args: { value: "경" },
};

export const RestrictToSuggestions: Story = {
	args: { restrictToSuggestions: true },
};
