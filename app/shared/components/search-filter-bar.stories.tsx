import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { SearchFilterBar } from "./search-filter-bar";

const meta = {
	title: "Components/SearchFilterBar",
	component: SearchFilterBar,
	args: {
		major: "",
		onMajorChange: fn(),
		gpa: "",
		onGpaChange: fn(),
		languageCert: "",
		onLanguageCertChange: fn(),
		score: "",
		onScoreChange: fn(),
		country: "",
		onCountryChange: fn(),
		requireReview: false,
		onRequireReviewChange: fn(),
		onSubmit: fn(),
		majorSuggestions: ["경영학과", "컴퓨터학부", "경제학과", "국제통상학과"],
		countrySuggestions: ["미국", "일본", "독일", "프랑스", "영국"],
		languageCertOptions: [
			{ value: "toefl", label: "TOEFL" },
			{ value: "ielts", label: "IELTS" },
			{ value: "toeic", label: "TOEIC" },
			{ value: "jlpt", label: "JLPT" },
		],
	},
} satisfies Meta<typeof SearchFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
