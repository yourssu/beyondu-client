import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextInput } from "./text-input";

const meta = {
	title: "Primitives/TextInput",
	component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
	args: { placeholder: "텍스트를 입력하세요" },
};

export const Error: Story = {
	args: { error: true, placeholder: "잘못된 입력" },
};

export const Disabled: Story = {
	args: { disabled: true, placeholder: "비활성화됨" },
};
