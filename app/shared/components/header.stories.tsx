import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./header";

const meta = {
	title: "Components/Header",
	component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChildren: Story = {
	args: {
		children: (
			<div className="border-t border-base-400 px-8 py-2 text-base-700 text-style-caption">
				서브 네비게이션
			</div>
		),
	},
};
