import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentSection } from "./content-section";

const meta = {
	title: "Components/ContentSection",
	component: ContentSection,
	args: {
		title: "학교 정보",
		children: <p className="text-base-700 text-style-body">여기에 학교 정보가 표시됩니다.</p>,
	},
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
