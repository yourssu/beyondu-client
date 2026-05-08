import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { CategorizedList, type CategorizedListCategory } from "./categorized-list";

const categories: CategorizedListCategory[] = [
	{
		id: "남미",
		items: ["과테말라", "도미니카공화국", "멕시코", "브라질"].map((nation) => ({
			label: nation,
			value: nation,
		})),
		label: "남미",
	},
	{
		id: "북미",
		items: ["미국", "캐나다"].map((nation) => ({ label: nation, value: nation })),
		label: "북미",
	},
	{
		id: "아시아",
		items: ["대만", "말레이시아", "몽골", "미얀마"].map((nation) => ({
			label: nation,
			value: nation,
		})),
		label: "아시아",
	},
	{
		id: "아프리카",
		items: ["튀니지"].map((nation) => ({ label: nation, value: nation })),
		label: "아프리카",
	},
	{
		id: "오세아니아",
		items: ["호주"].map((nation) => ({ label: nation, value: nation })),
		label: "오세아니아",
	},
	{
		id: "유럽",
		items: ["그리스", "네덜란드", "독일", "라트비아"].map((nation) => ({
			label: nation,
			value: nation,
		})),
		label: "유럽",
	},
];

interface CategorizedListDemoProps {
	defaultValue?: string[];
	empty?: boolean;
}

function CategorizedListDemo({ defaultValue = [], empty = false }: CategorizedListDemoProps) {
	const [value, setValue] = useState(defaultValue);

	return (
		<CategorizedList
			ariaLabel="국가 선택"
			categories={empty ? [] : categories}
			onValueChange={setValue}
			value={value}
		/>
	);
}

const meta = {
	args: {
		defaultValue: [],
		empty: false,
	},
	component: CategorizedListDemo,
	title: "Primitives/CategorizedList",
} satisfies Meta<typeof CategorizedListDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedItems: Story = {
	args: {
		defaultValue: ["미국", "캐나다"],
	},
};

export const WithTags: Story = {
	render: () => {
		const taggedCategories: CategorizedListCategory[] = [
			{
				id: "경영/경제",
				items: [
					{ label: "Architecture", tags: ["건축학부"], value: "Architecture" },
					{
						label: "Computer Science",
						tags: ["컴퓨터공학과", "소프트웨어학과"],
						value: "Computer Science",
					},
					{
						label: "Electrical Engineering",
						tags: ["전기공학부", "전자정보공학부"],
						value: "Electrical Engineering",
					},
				],
				label: "경영/경제 분야",
			},
		];
		const [value, setValue] = useState(["Computer Science"]);

		return (
			<CategorizedList
				ariaLabel="전공 선택"
				categories={taggedCategories}
				onValueChange={setValue}
				value={value}
			/>
		);
	},
};

export const Empty: Story = {
	args: {
		empty: true,
	},
};
