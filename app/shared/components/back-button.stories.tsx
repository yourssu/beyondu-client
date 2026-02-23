import type { Meta, StoryObj } from "@storybook/react-vite";

import { withRouter } from "../../../.storybook/decorators";
import { BackButton } from "./back-button";

const meta = {
	component: BackButton,
	decorators: [withRouter],
	title: "Components/BackButton",
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHref: Story = {
	args: { href: "/" },
};

export const WithOnClick: Story = {
	args: { onClick: () => window.history.back() },
};
