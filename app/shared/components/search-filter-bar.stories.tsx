import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { SearchFilterBarCompact, SearchFilterBarFull } from "./search-filter-bar";

const defaultFilters = {
	gpa: "",
	languageGroups: [],
	languageTests: [],
	majors: [],
	nations: [],
	regions: [],
	requireReview: false,
};

const meta = {
	args: {
		filters: defaultFilters,
		onFiltersChange: fn(),
		onSubmit: fn(),
	},
	component: SearchFilterBarCompact,
	title: "Components/SearchFilterBar",
} satisfies Meta<typeof SearchFilterBarCompact>;

export default meta;
type CompactStory = StoryObj<typeof meta>;
type FullStory = StoryObj<typeof SearchFilterBarFull>;

export const Compact: CompactStory = {};

export const CompactWithChips: CompactStory = {
	args: {
		filters: {
			...defaultFilters,
			gpa: "3.8",
			languageTests: [{ examType: "TOEFL_IBT", score: "90" }],
			majors: ["business", "computer science"],
			nations: ["미국"],
		},
	},
};

export const Full: FullStory = {
	args: {
		filters: defaultFilters,
		onFiltersChange: fn(),
		onSubmit: fn(),
	},
	render: (args) => <SearchFilterBarFull {...args} />,
};
