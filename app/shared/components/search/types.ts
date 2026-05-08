import type {
	ExamTypeResponse,
	MajorCategoryResponse,
	NationsByRegionResponse,
} from "~/shared/api/types";
import type { FilterFormData } from "~/shared/types/filter";

export interface SearchFilterBarProps {
	filters: FilterFormData;
	onFiltersChange: (filters: FilterFormData) => void;
	onSubmit: (filters?: FilterFormData) => void;
	nationsByRegion?: NationsByRegionResponse[];
	nationsLoading?: boolean;
	majorCategories?: MajorCategoryResponse[];
	majorsLoading?: boolean;
	examTypes?: ExamTypeResponse[];
	languageGroups?: string[];
	regions?: string[];
	disabled?: boolean;
	className?: string;
}
