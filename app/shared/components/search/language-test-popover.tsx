import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/cn";
import type { ExamTypeResponse, LanguageExamParamName } from "~/shared/api/types";
import type { LanguageTestFilter } from "~/shared/types/filter";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/primitives/popover";

import { LanguageTestCompoundList } from "./language-test-compound-list";
import { examLabel } from "./utils";

interface LanguageTestPopoverProps {
	className?: string;
	disabled?: boolean;
	examTypes?: ExamTypeResponse[];
	onLanguageTestsChange: (languageTests: LanguageTestFilter[]) => void;
	selectedLanguageTests: LanguageTestFilter[];
}

function triggerLabel(examTypes: ExamTypeResponse[], selectedLanguageTests: LanguageTestFilter[]) {
	if (selectedLanguageTests.length === 0) return "언어 선택";

	const firstTest = selectedLanguageTests[0];
	const label = examLabel(examTypes, firstTest.examType);
	if (selectedLanguageTests.length > 1) return `${label} 외 ${selectedLanguageTests.length - 1}개`;
	if (!firstTest.score) return label;

	return `${label} ${displayScore(firstTest.examType, firstTest.score)}`;
}

function displayScore(examType: LanguageExamParamName, score: string) {
	if (examType === "JLPT") return `N${score}`;
	if (examType === "HSK" || examType === "DELF" || examType === "ZD") return `${score}급`;

	return score;
}

function removeEmptyScores(selectedLanguageTests: LanguageTestFilter[]) {
	return selectedLanguageTests.filter((test) => test.score.trim());
}

export function LanguageTestPopover({
	className,
	disabled = false,
	examTypes = [],
	onLanguageTestsChange,
	selectedLanguageTests,
}: LanguageTestPopoverProps) {
	const [open, setOpen] = useState(false);
	const hasOptions = examTypes.length > 0;
	const isDisabled = disabled || !hasOptions;
	const label = hasOptions
		? triggerLabel(examTypes, selectedLanguageTests)
		: "선택 가능한 언어 없음";

	function handleOpenChange(nextOpen: boolean) {
		setOpen(nextOpen);
		if (!nextOpen) onLanguageTestsChange(removeEmptyScores(selectedLanguageTests));
	}

	return (
		<Popover onOpenChange={handleOpenChange} open={open}>
			<PopoverTrigger
				className={cn(
					"flex h-12.5 w-full min-w-0 items-center justify-between rounded-input border border-base-400 bg-surface-white px-4 py-3 text-left text-base-900 text-style-body focus:border-primary-brown focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
					className,
				)}
				disabled={isDisabled}
			>
				<span
					className={cn(
						"min-w-0 truncate",
						selectedLanguageTests.length === 0 && !isDisabled && "text-base-400",
					)}
				>
					{label}
				</span>
				<ChevronDown className="size-5 shrink-0 text-base-700" />
			</PopoverTrigger>
			<PopoverContent
				className="h-language-dropdown-height w-language-dropdown overflow-hidden p-0"
				sideOffset={4}
			>
				<LanguageTestCompoundList
					className="h-full overflow-y-auto"
					examTypes={examTypes}
					onEscapeKeyDown={() => setOpen(false)}
					onValueChange={onLanguageTestsChange}
					value={selectedLanguageTests}
				/>
			</PopoverContent>
		</Popover>
	);
}
