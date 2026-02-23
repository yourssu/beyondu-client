import { useId, useMemo, useRef, useState } from "react";

import { cn } from "~/lib/cn";

interface ComboboxProps {
	suggestions: string[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	restrictToSuggestions?: boolean;
	error?: boolean;
	className?: string;
	name?: string;
}

export function Combobox({
	suggestions,
	value = "",
	onChange,
	placeholder,
	restrictToSuggestions = false,
	error,
	className,
	name,
}: ComboboxProps) {
	const id = useId();
	const listboxId = `${id}-listbox`;
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);

	const filtered = useMemo(
		() => suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase())),
		[suggestions, value],
	);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange?.(e.target.value);
		setIsOpen(true);
		setActiveIndex(-1);
	}

	function selectItem(item: string) {
		onChange?.(item);
		setIsOpen(false);
		setActiveIndex(-1);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!isOpen && e.key === "ArrowDown") {
			setIsOpen(true);
			setActiveIndex(0);
			e.preventDefault();
			return;
		}

		if (!isOpen) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
				break;
			case "ArrowUp":
				e.preventDefault();
				setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
				break;
			case "Enter":
				e.preventDefault();
				if (activeIndex >= 0 && activeIndex < filtered.length) {
					selectItem(filtered[activeIndex]);
				}
				break;
			case "Escape":
				e.preventDefault();
				setIsOpen(false);
				setActiveIndex(-1);
				break;
		}
	}

	function handleBlur() {
		// setTimeout to allow click on listbox items to fire first
		setTimeout(() => {
			setIsOpen(false);
			setActiveIndex(-1);
			if (restrictToSuggestions && !suggestions.includes(value)) {
				onChange?.("");
			}
		}, 150);
	}

	return (
		<div className="relative">
			<input
				aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
				aria-autocomplete="list"
				aria-controls={listboxId}
				aria-expanded={isOpen}
				className={cn(
					"h-[50px] w-full rounded-input border border-base-400 bg-white px-4 py-3 text-base-900 text-style-body placeholder:text-base-400 focus:border-primary-brown focus:outline-none",
					error && "border-red-500",
					className,
				)}
				name={name}
				onBlur={handleBlur}
				onChange={handleInputChange}
				onFocus={() => value && setIsOpen(true)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				ref={inputRef}
				role="combobox"
				type="text"
				value={value}
			/>
			{isOpen && filtered.length > 0 && (
				<div
					className="absolute top-full left-0 z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-input border border-base-400 bg-white shadow-lg"
					id={listboxId}
					role="listbox"
				>
					{filtered.map((item, index) => (
						<div
							aria-selected={index === activeIndex}
							className={cn(
								"cursor-pointer px-4 py-2 text-style-body hover:bg-surface-page",
								index === activeIndex && "bg-surface-page",
							)}
							id={`${id}-option-${index}`}
							key={item}
							onMouseDown={() => selectItem(item)}
							onMouseEnter={() => setActiveIndex(index)}
							role="option"
							tabIndex={-1}
						>
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
