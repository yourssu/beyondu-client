import type { Meta, StoryObj } from "@storybook/react-vite";

import { Combobox } from "./combobox";

const suggestions = ["경영학과", "컴퓨터학부", "경제학과", "국제통상학과", "영어영문학과"];

const meta = {
	args: {
		placeholder: "예: 경영학과, 컴퓨터학부",
		suggestions,
	},
	component: Combobox,
	title: "Primitives/Combobox",
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Prefilled: Story = {
	args: { value: "경" },
};

export const RestrictToSuggestions: Story = {
	args: { restrictToSuggestions: true },
};
