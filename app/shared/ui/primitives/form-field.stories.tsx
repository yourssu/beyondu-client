import type { Meta, StoryObj } from "@storybook/react-vite";

import { FormField } from "./form-field";
import { TextInput } from "./text-input";

const meta = {
	title: "Primitives/FormField",
	component: FormField,
	args: {
		label: "전공",
		children: <TextInput placeholder="예: 경영학과" />,
	},
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
	args: {
		error: "필수 입력 항목입니다.",
		children: <TextInput error placeholder="예: 경영학과" />,
	},
};
