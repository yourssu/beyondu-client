import type { Meta, StoryObj } from "@storybook/react-vite";

import { withRouter } from "../../../.storybook/decorators";

import { UniversityCard } from "./university-card";

const meta = {
	title: "Components/UniversityCard",
	component: UniversityCard,
	decorators: [withRouter],
	args: {
		id: "1",
		country: "미국",
		exchangeType: "교환학생",
		nameEn: "University of California, Berkeley",
		nameKr: "캘리포니아 대학교 버클리",
		languageRequirements: [],
		hasReview: false,
	},
} satisfies Meta<typeof UniversityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithReview: Story = {
	args: {
		hasReview: true,
		reviewYears: "2024, 2025",
	},
};

export const WithLanguageReqs: Story = {
	args: {
		languageRequirements: [
			{ name: "TOEFL", score: "90" },
			{ name: "IELTS", score: "6.5" },
		],
		hasReview: true,
		program: "GKS",
	},
};
