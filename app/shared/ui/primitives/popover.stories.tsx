import type { Meta, StoryObj } from "@storybook/react-vite";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function PopoverDemo() {
	return (
		<div className="flex h-64 items-center justify-center">
			<Popover>
				<PopoverTrigger className="rounded-input border border-base-400 bg-surface-white px-4 py-3 text-base-900 text-style-body">
					Popover 열기
				</PopoverTrigger>
				<PopoverContent className="w-64 p-4 text-base-900 text-style-body-sm">
					Base UI 기반 Popover content입니다.
				</PopoverContent>
			</Popover>
		</div>
	);
}

const meta = {
	component: PopoverDemo,
	title: "Primitives/Popover",
} satisfies Meta<typeof PopoverDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
