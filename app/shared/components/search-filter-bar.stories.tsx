import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { SearchFilterBar } from "./search-filter-bar";

const meta = {
	args: {
		country: "",
		countrySuggestions: ["미국", "일본", "독일", "프랑스", "영국"],
		gpa: "",
		languageCert: "",
		languageCertOptions: [
			{ label: "TOEFL", value: "toefl" },
			{ label: "IELTS", value: "ielts" },
			{ label: "TOEIC", value: "toeic" },
			{ label: "JLPT", value: "jlpt" },
		],
		major: "",
		majorSuggestions: ["경영학과", "컴퓨터학부", "경제학과", "국제통상학과"],
		onCountryChange: fn(),
		onGpaChange: fn(),
		onLanguageCertChange: fn(),
		onMajorChange: fn(),
		onRequireReviewChange: fn(),
		onScoreChange: fn(),
		onSubmit: fn(),
		requireReview: false,
		score: "",
	},
	component: SearchFilterBar,
	title: "Components/SearchFilterBar",
} satisfies Meta<typeof SearchFilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
