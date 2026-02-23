import type { Meta, StoryObj } from "@storybook/react-vite";

import { InfoCard } from "./info-card";

const meta = {
	title: "Components/InfoCard",
	component: InfoCard,
	args: {
		title: "지원 자격",
		children: <p className="text-base-700 text-style-body">학점 3.0 이상, TOEFL 80 이상</p>,
	},
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
