import { Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "~/lib/cn";
import { Tag } from "~/shared/ui/primitives/tag";

export interface CategorizedListItem {
	value: string;
	label: string;
	disabled?: boolean;
	tags?: string[];
}

export interface CategorizedListCategory {
	id: string;
	label: string;
	items: CategorizedListItem[];
}

export interface CategorizedListProps {
	ariaLabel?: string;
	categories: CategorizedListCategory[];
	className?: string;
	emptyMessage?: string;
	onEscapeKeyDown?: () => void;
	onValueChange: (value: string[]) => void;
	value: string[];
}

function normalizeValue(value: string) {
	return value.trim().toLowerCase();
}

function toggleValue(values: string[], value: string) {
	const normalized = normalizeValue(value);
	const exists = values.some((item) => normalizeValue(item) === normalized);

	if (exists) {
		return values.filter((item) => normalizeValue(item) !== normalized);
	}

	return [...values, value];
}

export function CategorizedList({
	ariaLabel = "분류된 목록",
	categories,
	className,
	emptyMessage = "선택 가능한 항목이 없습니다.",
	onEscapeKeyDown,
	onValueChange,
	value,
}: CategorizedListProps) {
	const listRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef(new Map<string, HTMLButtonElement>());
	const sectionRefs = useRef(new Map<string, HTMLElement>());
	const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");
	const [activeValue, setActiveValue] = useState("");

	const items = useMemo(
		() =>
			categories.flatMap((category) =>
				category.items.map((item) => ({ ...item, categoryId: category.id })),
			),
		[categories],
	);
	const enabledItems = useMemo(() => items.filter((item) => !item.disabled), [items]);
	const hasItems = enabledItems.length > 0;

	useEffect(() => {
		if (!hasItems) {
			setActiveValue("");
			return;
		}

		const selectedItem = enabledItems.find((item) =>
			value.some((selected) => normalizeValue(selected) === normalizeValue(item.value)),
		);
		setActiveValue((current) =>
			enabledItems.some((item) => item.value === current)
				? current
				: (selectedItem?.value ?? enabledItems[0].value),
		);
	}, [enabledItems, hasItems, value]);

	useEffect(() => {
		setActiveCategoryId((current) =>
			categories.some((category) => category.id === current) ? current : (categories[0]?.id ?? ""),
		);
	}, [categories]);

	useEffect(() => {
		listRef.current?.focus();
	}, []);

	function isSelected(itemValue: string) {
		return value.some((selected) => normalizeValue(selected) === normalizeValue(itemValue));
	}

	function toggleItem(itemValue: string) {
		onValueChange(toggleValue(value, itemValue));
	}

	function scrollToCategory(categoryId: string) {
		sectionRefs.current.get(categoryId)?.scrollIntoView({ block: "start" });
		setActiveCategoryId(categoryId);
	}

	function updateActiveCategory() {
		const container = listRef.current;
		if (!container) return;

		let next = categories[0]?.id ?? "";
		const threshold = 8;

		for (const category of categories) {
			const section = sectionRefs.current.get(category.id);
			if (!section) continue;
			if (section.offsetTop <= container.scrollTop + threshold) {
				next = category.id;
			}
		}

		setActiveCategoryId(next);
	}

	function moveActive(offset: number) {
		if (enabledItems.length === 0) return;

		const currentIndex = Math.max(
			0,
			enabledItems.findIndex((item) => item.value === activeValue),
		);
		const nextIndex = Math.min(Math.max(currentIndex + offset, 0), enabledItems.length - 1);
		const next = enabledItems[nextIndex];

		setActiveValue(next.value);
		setActiveCategoryId(next.categoryId);
		itemRefs.current.get(next.value)?.scrollIntoView({ block: "nearest" });
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				moveActive(1);
				break;
			case "ArrowUp":
				event.preventDefault();
				moveActive(-1);
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				if (activeValue) toggleItem(activeValue);
				break;
			case "Escape":
				event.preventDefault();
				onEscapeKeyDown?.();
				break;
		}
	}

	return (
		<div
			className={cn(
				"flex w-country-dropdown max-w-full flex-col overflow-hidden rounded-input bg-surface-white shadow-elevation-3",
				"max-h-country-dropdown-height",
				className,
			)}
		>
			<div className="flex shrink-0 flex-col gap-2.5 border-primary-green border-b px-6 pt-3 pb-6">
				<p className="text-base-700 text-style-body-bold">대륙</p>
				<div className="flex gap-1 overflow-x-auto">
					{categories.map((category) => (
						<button
							aria-current={category.id === activeCategoryId ? "true" : undefined}
							className={cn(
								"spring-bounce-0 spring-duration-150 shrink-0 rounded-full border border-base-400 bg-surface-white px-4.5 py-2 text-base-900 text-style-caption transition-colors hover:bg-surface-hover focus:outline-none focus-visible:border-primary-brown",
								category.id === activeCategoryId &&
									"border-primary-olive bg-surface-hover text-primary-olive",
							)}
							key={category.id}
							onClick={() => scrollToCategory(category.id)}
							type="button"
						>
							{category.label}
						</button>
					))}
				</div>
			</div>

			<div
				aria-label={ariaLabel}
				aria-multiselectable="true"
				className="min-h-0 flex-1 overflow-y-auto outline-none"
				onKeyDown={handleKeyDown}
				onScroll={updateActiveCategory}
				ref={listRef}
				role="listbox"
				tabIndex={0}
			>
				{hasItems ? (
					categories.map((category) => (
						<section
							key={category.id}
							ref={(node) => {
								if (node) sectionRefs.current.set(category.id, node);
								else sectionRefs.current.delete(category.id);
							}}
						>
							<div className="bg-surface-tag px-6 py-2.5 text-base-300 text-style-body-bold">
								{category.label}
							</div>
							{category.items.map((item) => {
								const selected = isSelected(item.value);
								const active = item.value === activeValue;

								return (
									<button
										aria-selected={selected}
										className={cn(
											"spring-bounce-0 spring-duration-150 flex w-full flex-col items-start gap-1.5 px-10 py-2 text-left text-base-900 text-style-body-sm transition-colors hover:bg-surface-hover focus:outline-none",
											selected && "text-primary-olive",
											active && "bg-surface-hover",
											selected && active && "bg-primary-green",
											item.disabled && "cursor-not-allowed opacity-50",
										)}
										disabled={item.disabled}
										key={`${category.id}-${item.value}`}
										onClick={() => toggleItem(item.value)}
										onMouseEnter={() => {
											setActiveValue(item.value);
											setActiveCategoryId(category.id);
										}}
										ref={(node) => {
											if (node) itemRefs.current.set(item.value, node);
											else itemRefs.current.delete(item.value);
										}}
										role="option"
										type="button"
									>
										<span className="flex items-center gap-2">
											<span>{item.label}</span>
											{selected && <Check className="size-4 shrink-0" />}
										</span>
										{item.tags && item.tags.length > 0 && (
											<span className="flex max-w-full flex-wrap gap-1.5 text-base-700">
												{item.tags.map((tag) => (
													<Tag key={tag} programType={tag} />
												))}
											</span>
										)}
									</button>
								);
							})}
						</section>
					))
				) : (
					<p className="px-6 py-10 text-center text-base-400 text-style-body-sm">{emptyMessage}</p>
				)}
			</div>
		</div>
	);
}
