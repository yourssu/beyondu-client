import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import { Tooltip } from "./tooltip";

const meta = {
	title: "Primitives/Tooltip",
	component: Tooltip,
	args: {
		content: "도움말 텍스트",
		children: <Button>호버하세요</Button>,
	},
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center p-20">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
	args: { open: true },
};
