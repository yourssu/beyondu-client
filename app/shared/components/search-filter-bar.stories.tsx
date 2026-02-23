import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import countries from "~/shared/constants/countries.json";
import languageCertificates from "~/shared/constants/language-certificates.json";
import majors from "~/shared/constants/majors.json";

import { SearchFilterBar } from "./search-filter-bar";

const meta = {
	args: {
		country: "",
		countrySuggestions: countries,
		gpa: "",
		languageCert: "",
		languageCertOptions: languageCertificates,
		major: "",
		majorSuggestions: majors,
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
