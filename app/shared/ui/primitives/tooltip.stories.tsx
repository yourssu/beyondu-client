import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import { Tooltip } from "./tooltip";

const meta = {
	args: {
		children: <Button>호버하세요</Button>,
		content: "도움말 텍스트",
	},
	component: Tooltip,
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center p-20">
				<Story />
			</div>
		),
	],
	title: "Primitives/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultOpen: Story = {
	args: { defaultOpen: true },
};

export const Open: Story = {
	args: { open: true },
};
