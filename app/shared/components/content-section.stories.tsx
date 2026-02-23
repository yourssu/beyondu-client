import type { Meta, StoryObj } from "@storybook/react-vite";

import { ContentSection } from "./content-section";

const meta = {
	args: {
		children: <p className="text-base-700 text-style-body">여기에 학교 정보가 표시됩니다.</p>,
		title: "학교 정보",
	},
	component: ContentSection,
	title: "Components/ContentSection",
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
