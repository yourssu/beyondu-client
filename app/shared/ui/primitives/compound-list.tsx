import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import {
	Children,
	createContext,
	isValidElement,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { cn } from "~/lib/cn";

interface CompoundListContextValue {
	activeValue: string;
	isSelected: (value: string) => boolean;
	registerItem: (value: string, element: HTMLButtonElement | null, disabled: boolean) => void;
	setActiveValue: (value: string) => void;
	toggleItem: (value: string) => void;
}

interface CompoundListItemContextValue {
	disabled: boolean;
	selected: boolean;
	value: string;
}

export interface CompoundListProps extends Omit<React.ComponentProps<"div">, "onChange"> {
	ariaLabel?: string;
	onEscapeKeyDown?: () => void;
	onValueChange: (value: string[]) => void;
	value: string[];
}

export interface CompoundListItemProps extends Omit<React.ComponentProps<"div">, "value"> {
	disabled?: boolean;
	value: string;
}

export interface CompoundListItemDetailsProps extends React.ComponentProps<"div"> {
	forceMount?: boolean;
}

export interface CompoundListNumberFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
	error?: boolean;
}

export interface CompoundListSelectFieldOption {
	label: string;
	value: string;
}

export interface CompoundListSelectFieldProps {
	"aria-label"?: string;
	className?: string;
	disabled?: boolean;
	error?: boolean;
	name?: string;
	onValueChange?: (value: string) => void;
	options: CompoundListSelectFieldOption[];
	placeholder?: string;
	value?: string;
}

const CompoundListContext = createContext<CompoundListContextValue | null>(null);
const CompoundListItemContext = createContext<CompoundListItemContextValue | null>(null);

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

function isInteractiveTarget(target: EventTarget | null) {
	return (
		target instanceof HTMLElement &&
		Boolean(
			target.closest("input, select, textarea, [role='combobox'], [data-compound-list-field]"),
		)
	);
}

function useCompoundList() {
	const context = useContext(CompoundListContext);
	if (!context) {
		throw new Error("CompoundList components must be used within CompoundList.");
	}
	return context;
}

function useCompoundListItem() {
	const context = useContext(CompoundListItemContext);
	if (!context) {
		throw new Error("CompoundListItemDetails must be used within CompoundListItem.");
	}
	return context;
}

export function CompoundList({
	ariaLabel = "선택 목록",
	children,
	className,
	onEscapeKeyDown,
	onKeyDown,
	onValueChange,
	value,
	...props
}: CompoundListProps) {
	const listRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef(new Map<string, HTMLButtonElement>());
	const disabledItems = useRef(new Set<string>());
	const [activeValue, setActiveValue] = useState("");
	const [enabledValues, setEnabledValues] = useState<string[]>([]);

	useEffect(() => {
		listRef.current?.focus();
	}, []);

	useEffect(() => {
		const selectedItem = enabledValues.find((itemValue) =>
			value.some((selected) => normalizeValue(selected) === normalizeValue(itemValue)),
		);
		setActiveValue((current) =>
			enabledValues.includes(current) ? current : (selectedItem ?? enabledValues[0] ?? ""),
		);
	}, [enabledValues, value]);

	const isSelected = useCallback(
		(itemValue: string) =>
			value.some((selected) => normalizeValue(selected) === normalizeValue(itemValue)),
		[value],
	);

	const toggleItem = useCallback(
		(itemValue: string) => {
			onValueChange(toggleValue(value, itemValue));
		},
		[onValueChange, value],
	);

	const registerItem = useCallback(
		(itemValue: string, element: HTMLButtonElement | null, disabled: boolean) => {
			if (element) {
				itemRefs.current.set(itemValue, element);
			} else {
				itemRefs.current.delete(itemValue);
			}

			if (disabled) {
				disabledItems.current.add(itemValue);
			} else {
				disabledItems.current.delete(itemValue);
			}

			setEnabledValues(
				Array.from(itemRefs.current.keys()).filter((value) => !disabledItems.current.has(value)),
			);
		},
		[],
	);

	function moveActive(offset: number) {
		if (enabledValues.length === 0) return;

		const currentIndex = Math.max(0, enabledValues.indexOf(activeValue));
		const nextIndex = Math.min(Math.max(currentIndex + offset, 0), enabledValues.length - 1);
		const nextValue = enabledValues[nextIndex];

		setActiveValue(nextValue);
		itemRefs.current.get(nextValue)?.scrollIntoView({ block: "nearest" });
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
		onKeyDown?.(event);
		if (event.defaultPrevented || isInteractiveTarget(event.target)) return;
		if (
			event.target instanceof HTMLButtonElement &&
			event.target.getAttribute("role") === "option" &&
			(event.key === "Enter" || event.key === " ")
		) {
			return;
		}

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

	const contextValue = useMemo(
		() => ({ activeValue, isSelected, registerItem, setActiveValue, toggleItem }),
		[activeValue, isSelected, registerItem, toggleItem],
	);

	return (
		<CompoundListContext.Provider value={contextValue}>
			<div
				aria-label={ariaLabel}
				aria-multiselectable="true"
				className={cn(
					"flex max-w-full flex-col overflow-hidden rounded-input bg-surface-white py-2 shadow-elevation-1 outline-none",
					className,
				)}
				onKeyDown={handleKeyDown}
				ref={listRef}
				role="listbox"
				tabIndex={0}
				{...props}
			>
				{children}
			</div>
		</CompoundListContext.Provider>
	);
}

export function CompoundListItem({
	children,
	className,
	disabled = false,
	value,
	...props
}: CompoundListItemProps) {
	const { activeValue, isSelected, registerItem, setActiveValue, toggleItem } = useCompoundList();
	const selected = isSelected(value);
	const active = value === activeValue;
	const itemContextValue = useMemo(
		() => ({ disabled, selected, value }),
		[disabled, selected, value],
	);
	const handleItemRef = useCallback(
		(node: HTMLButtonElement | null) => registerItem(value, node, disabled),
		[disabled, registerItem, value],
	);
	const childArray = Children.toArray(children);
	const details = childArray.filter(
		(child) => isValidElement(child) && child.type === CompoundListItemDetails,
	);
	const label = childArray.filter(
		(child) => !(isValidElement(child) && child.type === CompoundListItemDetails),
	);

	return (
		<CompoundListItemContext.Provider value={itemContextValue}>
			<div className={cn("flex flex-col", className)} {...props}>
				<button
					aria-selected={selected}
					className={cn(
						"spring-bounce-0 spring-duration-150 flex w-full items-center gap-2.5 px-6 pt-2 pb-3 text-left text-base-900 text-style-body-sm transition-colors focus:outline-none",
						"hover:bg-surface-hover",
						selected && "text-primary-olive",
						active && "bg-surface-hover",
						disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
					)}
					disabled={disabled}
					onClick={() => toggleItem(value)}
					onFocus={() => setActiveValue(value)}
					onMouseEnter={() => setActiveValue(value)}
					ref={handleItemRef}
					role="option"
					type="button"
				>
					<span>{label}</span>
					{selected && <Check aria-hidden="true" className="size-4 shrink-0 stroke-3" />}
				</button>
				{details}
			</div>
		</CompoundListItemContext.Provider>
	);
}

export function CompoundListItemDetails({
	children,
	className,
	forceMount = false,
	...props
}: CompoundListItemDetailsProps) {
	const { selected } = useCompoundListItem();

	if (!selected && !forceMount) return null;

	return (
		<div
			className={cn("flex items-center gap-2.5 px-6 pb-3", !selected && "hidden", className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function CompoundListNumberField({
	className,
	error,
	...props
}: CompoundListNumberFieldProps) {
	return (
		<input
			className={cn(
				"h-9 w-compound-list-field rounded-input border border-transparent bg-surface-tag px-3 text-base-900 text-style-body-sm placeholder:text-base-400",
				"spring-bounce-0 spring-duration-200 transition",
				"focus:border-primary-brown focus:outline-none focus:ring-2 focus:ring-primary-brown/20",
				"disabled:cursor-not-allowed disabled:opacity-50",
				error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
				className,
			)}
			data-compound-list-field=""
			type="number"
			{...props}
		/>
	);
}

export function CompoundListSelectField({
	"aria-label": ariaLabel,
	className,
	disabled,
	error,
	name,
	onValueChange,
	options,
	placeholder,
	value,
}: CompoundListSelectFieldProps) {
	function stopListKeyboard(event: React.KeyboardEvent) {
		event.stopPropagation();
	}

	return (
		<SelectPrimitive.Root
			disabled={disabled}
			name={name}
			onValueChange={onValueChange}
			value={value}
		>
			<SelectPrimitive.Trigger
				aria-label={ariaLabel}
				className={cn(
					"flex h-9 w-compound-list-field items-center justify-between rounded-input border border-transparent bg-surface-tag px-3 text-base-900 text-style-body-sm outline-none",
					"spring-bounce-0 spring-duration-200 transition",
					"focus:border-primary-brown focus:ring-2 focus:ring-primary-brown/20",
					"disabled:cursor-not-allowed disabled:opacity-50",
					error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
					className,
				)}
				data-compound-list-field=""
				onKeyDown={stopListKeyboard}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDown aria-hidden="true" className="size-4 text-base-700" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					className="z-50 w-(--radix-select-trigger-width) animate-dropdown-in overflow-hidden rounded-input border border-base-400 bg-surface-white shadow-elevation-1 data-[state=closed]:animate-dropdown-out"
					onKeyDown={stopListKeyboard}
					position="popper"
					sideOffset={4}
				>
					<SelectPrimitive.Viewport>
						{options.map((option) => (
							<SelectPrimitive.Item
								className="spring-bounce-0 spring-duration-150 flex cursor-pointer items-center gap-2 px-3 py-2 text-base-900 text-style-body-sm outline-none transition-colors data-highlighted:bg-surface-hover"
								key={option.value}
								value={option.value}
							>
								<SelectPrimitive.ItemIndicator>
									<Check aria-hidden="true" className="size-4 text-primary-olive" />
								</SelectPrimitive.ItemIndicator>
								<SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
