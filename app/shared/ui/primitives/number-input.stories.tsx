import type { Meta, StoryObj } from "@storybook/react-vite";

import { NumberInput } from "./number-input";

const meta = {
	title: "Primitives/NumberInput",
	component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
	args: { placeholder: "예: 3.8" },
};

export const Error: Story = {
	args: { error: true, placeholder: "잘못된 입력" },
};

export const Disabled: Story = {
	args: { disabled: true, placeholder: "비활성화됨" },
};
