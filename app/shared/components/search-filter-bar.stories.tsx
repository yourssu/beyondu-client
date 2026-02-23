import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { SearchFilterBar } from "./search-filter-bar";

const meta = {
	args: {
		filters: {
			country: "",
			gpa: "",
			languageCert: "NONE",
			major: "",
			requireReview: false,
			score: "",
		},
		onFiltersChange: fn(),
		onSubmit: fn(),
	},
	component: SearchFilterBar,
	title: "Components/SearchFilterBar",
} satisfies Meta<typeof SearchFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = {};

export const Full: Story = {
	args: {
		variant: "full",
	},
};
