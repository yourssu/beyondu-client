import type { Meta, StoryObj } from "@storybook/react-vite";

import { FormField } from "./form-field";
import { TextInput } from "./text-input";

const meta = {
	args: {
		children: <TextInput placeholder="예: 경영학과" />,
		label: "전공",
	},
	component: FormField,
	title: "Primitives/FormField",
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
	args: {
		children: <TextInput error placeholder="예: 경영학과" />,
		error: "필수 입력 항목입니다.",
	},
};
