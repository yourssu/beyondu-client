import { ChevronDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { cn } from "~/lib/cn";
import type { MajorCategoryResponse } from "~/shared/api/types";
import {
	CategorizedList,
	type CategorizedListCategory,
} from "~/shared/ui/primitives/categorized-list";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/primitives/popover";

import { selectTriggerLabel } from "./utils";

interface MajorFilterPopoverProps {
	className?: string;
	error?: boolean;
	loading?: boolean;
	majorCategories?: MajorCategoryResponse[];
	onSelectedMajorsChange: (majors: string[]) => void;
	selectedMajors: string[];
}

export function MajorFilterPopover({
	className,
	error,
	loading = false,
	majorCategories = [],
	onSelectedMajorsChange,
	selectedMajors,
}: MajorFilterPopoverProps) {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const categories = useMemo<CategorizedListCategory[]>(
		() =>
			majorCategories
				.filter((group) => group.majors.length > 0)
				.map((group) => ({
					id: group.category,
					items: group.majors.map((major) => ({
						label: major.name,
						tags: major.koreanMajors,
						value: major.name,
					})),
					label: group.category,
				})),
		[majorCategories],
	);
	const hasOptions = categories.some((category) => category.items.length > 0);
	const disabled = loading || !hasOptions;
	const label = selectTriggerLabel(selectedMajors, loading, hasOptions, {
		empty: "전공 선택",
		loading: "전공 불러오는 중",
		noOptions: "선택 가능한 전공 없음",
	});

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger
				ref={triggerRef}
				className={cn(
					"flex h-12.5 w-full min-w-0 items-center justify-between rounded-input border border-base-400 bg-surface-white px-4 py-3 text-left text-base-900 text-style-body focus:border-primary-brown focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
					error && "border-red-500",
					className,
				)}
				disabled={disabled}
			>
				<span
					className={cn(
						"min-w-0 truncate",
						selectedMajors.length === 0 && !disabled && "text-base-400",
					)}
				>
					{label}
				</span>
				<ChevronDown className="size-5 shrink-0 text-base-700" />
			</PopoverTrigger>
			<PopoverContent className="overflow-hidden p-0" sideOffset={4}>
				<CategorizedList
					ariaLabel="전공 선택"
					categories={categories}
					categoryLabel="학과"
					onEscapeKeyDown={() => setOpen(false)}
					onValueChange={onSelectedMajorsChange}
					value={selectedMajors}
				/>
			</PopoverContent>
		</Popover>
	);
}
