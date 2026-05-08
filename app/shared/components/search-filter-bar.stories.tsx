import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import type { ExamTypeResponse } from "~/shared/api/types";

import { SearchFilterBarCompact } from "./search/search-filter-bar-compact";
import { SearchFilterBarFull } from "./search/search-filter-bar-full";

const defaultFilters = {
	gpa: "",
	languageGroups: [],
	languageTests: [],
	majors: [],
	nations: [],
	regions: [],
	requireReview: false,
};

const nationsByRegion = [
	{ nations: ["과테말라", "도미니카공화국", "멕시코", "브라질"], region: "남미" },
	{ nations: ["미국", "캐나다"], region: "북미" },
	{ nations: ["대만", "말레이시아", "몽골", "미얀마"], region: "아시아" },
	{ nations: ["튀니지"], region: "아프리카" },
	{ nations: ["호주"], region: "오세아니아" },
	{ nations: ["그리스", "네덜란드", "독일", "라트비아"], region: "유럽" },
];

const examTypes = [
	{ displayName: "TOEFL IBT", maxScore: 120, minScore: 0, paramName: "TOEFL_IBT" },
	{ displayName: "TOEFL ITP", maxScore: 677, minScore: 310, paramName: "TOEFL_ITP" },
	{ displayName: "TOEIC", maxScore: 990, minScore: 10, paramName: "TOEIC" },
	{ displayName: "IELTS", maxScore: 9, minScore: 0, paramName: "IELTS" },
	{ displayName: "JLPT", maxScore: 5, minScore: 1, paramName: "JLPT" },
	{ displayName: "JPT", maxScore: 990, minScore: 10, paramName: "JPT" },
	{ displayName: "HSK", maxScore: 6, minScore: 1, paramName: "HSK" },
	{ displayName: "DELF/DALF", maxScore: 6, minScore: 1, paramName: "DELF" },
	{ displayName: "Goethe/TestDaF/ZD", maxScore: 6, minScore: 1, paramName: "ZD" },
] satisfies ExamTypeResponse[];

const majorCategories = [
	{
		category: "경영/경제 분야",
		majors: [
			{ enumName: "ARCHITECTURE", koreanMajors: ["건축학부"], name: "Architecture" },
			{
				enumName: "COMPUTER_SCIENCE",
				koreanMajors: ["컴퓨터공학과", "소프트웨어학과"],
				name: "Computer Science",
			},
			{
				enumName: "ELECTRICAL_ENGINEERING",
				koreanMajors: ["전기공학부", "전자정보공학부"],
				name: "Electrical Engineering",
			},
		],
	},
	{
		category: "IT/공학 분야",
		majors: [
			{
				enumName: "MECHANICAL_ENGINEERING",
				koreanMajors: ["기계공학부"],
				name: "Mechanical Engineering",
			},
		],
	},
];

const meta = {
	args: {
		examTypes,
		filters: defaultFilters,
		majorCategories,
		nationsByRegion,
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
			languageTests: [
				{ examType: "TOEFL_IBT", score: "90" },
				{ examType: "JLPT", score: "2" },
			],
			majors: ["business", "computer science"],
			nations: ["미국"],
		},
	},
};

export const Full: FullStory = {
	args: {
		examTypes,
		filters: defaultFilters,
		majorCategories,
		nationsByRegion,
		onFiltersChange: fn(),
		onSubmit: fn(),
	},
	render: (args) => <SearchFilterBarFull {...args} />,
};

export const FullWithLanguageTests: FullStory = {
	args: {
		examTypes,
		filters: {
			...defaultFilters,
			languageTests: [
				{ examType: "TOEFL_IBT", score: "90" },
				{ examType: "JLPT", score: "2" },
			],
		},
		majorCategories,
		nationsByRegion,
		onFiltersChange: fn(),
		onSubmit: fn(),
	},
	render: (args) => <SearchFilterBarFull {...args} />,
};
