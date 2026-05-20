import type { Meta, StoryObj } from "@storybook/react-vite";

import { withRouter } from "../../../.storybook/decorators";
import { UniversityCard } from "./university-card";

const meta = {
	args: {
		badge: "교환학생",
		id: 1,
		isExchange: true,
		isVisit: false,
		languageRequirementSummary: null,
		nameEng: "University of California, Berkeley",
		nameKor: "캘리포니아 대학교 버클리",
		nation: "미국",
		programType: "",
		reviewStatus: "후기 없음",
	},
	component: UniversityCard,
	decorators: [withRouter],
	title: "Components/UniversityCard",
} satisfies Meta<typeof UniversityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithReview: Story = {
	args: {
		reviewStatus: "후기 있음 (2020-2025)",
	},
};

export const WithLanguageReqs: Story = {
	args: {
		languageRequirementSummary: "TOEFL 90 / IELTS 6.5",
		programType: "GKS",
		reviewStatus: "후기 있음 (2020-2025)",
	},
};
