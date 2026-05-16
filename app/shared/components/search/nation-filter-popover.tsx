import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "~/lib/cn";
import type { NationsByRegionResponse } from "~/shared/api/types";
import {
	CategorizedList,
	type CategorizedListCategory,
} from "~/shared/ui/primitives/categorized-list";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/primitives/popover";

import { selectTriggerLabel } from "./utils";

interface NationFilterPopoverProps {
	className?: string;
	error?: boolean;
	loading?: boolean;
	nationsByRegion?: NationsByRegionResponse[];
	onSelectedNationsChange: (nations: string[]) => void;
	selectedNations: string[];
}

export function NationFilterPopover({
	className,
	error,
	loading = false,
	nationsByRegion = [],
	onSelectedNationsChange,
	selectedNations,
}: NationFilterPopoverProps) {
	const [open, setOpen] = useState(false);
	const categories = useMemo<CategorizedListCategory[]>(
		() =>
			nationsByRegion
				.filter((group) => group.nations.length > 0)
				.map((group) => ({
					id: group.region,
					items: group.nations.map((nation) => ({ label: nation, value: nation })),
					label: group.region === "Unknown" ? "기타" : group.region,
				})),
		[nationsByRegion],
	);
	const hasOptions = categories.some((category) => category.items.length > 0);
	const disabled = loading || !hasOptions;
	const label = selectTriggerLabel(selectedNations, loading, hasOptions, {
		empty: "나라 선택",
		loading: "국가 불러오는 중",
		noOptions: "선택 가능한 국가 없음",
	});

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger
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
						selectedNations.length === 0 && !disabled && "text-base-400",
					)}
				>
					{label}
				</span>
				<ChevronDown className="size-5 shrink-0 text-base-700" />
			</PopoverTrigger>
			<PopoverContent className="overflow-hidden p-0" sideOffset={4}>
				<CategorizedList
					ariaLabel="국가 선택"
					categories={categories}
					onEscapeKeyDown={() => setOpen(false)}
					onValueChange={onSelectedNationsChange}
					value={selectedNations}
				/>
			</PopoverContent>
		</Popover>
	);
}
