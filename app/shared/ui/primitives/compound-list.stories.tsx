import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
	CompoundList,
	CompoundListItem,
	CompoundListItemDetails,
	CompoundListNumberField,
	CompoundListSelectField,
} from "./compound-list";

const languageTests = [
	{ label: "TOEFL IBT", value: "toefl-ibt" },
	{ label: "TOEFL ITP", value: "toefl-itp" },
	{ label: "TOEIC", value: "toeic" },
	{ label: "IELTS", value: "ielts" },
	{ label: "JLPT", value: "jlpt" },
	{ label: "JPT", value: "jpt" },
	{ label: "HSK", value: "hsk" },
	{ label: "DELF/DALF", value: "delf-dalf" },
	{ label: "Goethe/TestDaF/ZD", value: "goethe-testdaf-zd" },
];

const jlptLevels = ["N1", "N2", "N3", "N4", "N5"].map((level) => ({
	label: level,
	value: level,
}));

interface CompoundListDemoProps {
	defaultValue?: string[];
	disabledValues?: string[];
	showDetails?: boolean;
}

function CompoundListDemo({
	defaultValue = [],
	disabledValues = [],
	showDetails = false,
}: CompoundListDemoProps) {
	const [value, setValue] = useState(defaultValue);
	const [toeflScore, setToeflScore] = useState("90");
	const [jlptLevel, setJlptLevel] = useState("");
	const [hskLevel, setHskLevel] = useState("");

	return (
		<CompoundList
			ariaLabel="어학 시험 선택"
			className="w-filter-language"
			onValueChange={setValue}
			value={value}
		>
			{languageTests.map((test) => (
				<CompoundListItem
					disabled={disabledValues.includes(test.value)}
					key={test.value}
					value={test.value}
				>
					{test.label}
					{showDetails && test.value === "toefl-ibt" && (
						<CompoundListItemDetails>
							<CompoundListNumberField
								aria-label="TOEFL IBT 점수"
								onChange={(event) => setToeflScore(event.target.value)}
								value={toeflScore}
							/>
						</CompoundListItemDetails>
					)}
					{showDetails && test.value === "jlpt" && (
						<CompoundListItemDetails>
							<CompoundListSelectField
								aria-label="JLPT 급수"
								onValueChange={setJlptLevel}
								options={jlptLevels}
								placeholder="점수 (필수 아님)"
								value={jlptLevel}
							/>
						</CompoundListItemDetails>
					)}
					{showDetails && test.value === "hsk" && (
						<CompoundListItemDetails>
							<CompoundListSelectField
								aria-label="HSK 급수"
								onValueChange={setHskLevel}
								options={["1급", "2급", "3급", "4급", "5급", "6급"].map((level) => ({
									label: level,
									value: level,
								}))}
								placeholder="급수"
								value={hskLevel}
							/>
						</CompoundListItemDetails>
					)}
				</CompoundListItem>
			))}
		</CompoundList>
	);
}

const meta = {
	args: {
		defaultValue: [],
		disabledValues: [],
		showDetails: false,
	},
	component: CompoundListDemo,
	title: "Primitives/CompoundList",
} satisfies Meta<typeof CompoundListDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelectedDetails: Story = {
	args: {
		defaultValue: ["toefl-ibt", "jlpt"],
		showDetails: true,
	},
};

export const DisabledItems: Story = {
	args: {
		defaultValue: ["toeic"],
		disabledValues: ["toefl-itp", "ielts", "jpt"],
	},
};

export const MixedFields: Story = {
	args: {
		defaultValue: ["toefl-ibt", "jlpt", "hsk"],
		showDetails: true,
	},
};
