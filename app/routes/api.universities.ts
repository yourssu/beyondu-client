import { createApiClient, getUniversities } from "~/shared/api";
import type { UniversitySearchParams } from "~/shared/api/types";

import type { Route } from "./+types/api.universities";

export async function loader({ request, context }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const params: UniversitySearchParams = {};

	const page = url.searchParams.get("page");
	const size = url.searchParams.get("size");
	const gpa = url.searchParams.get("gpa");
	const major = url.searchParams.get("major");
	const nation = url.searchParams.get("nation");
	const hasReview = url.searchParams.get("hasReview");

	if (page) params.page = Number(page);
	if (size) params.size = Number(size);
	if (gpa) params.gpa = Number(gpa);
	if (major) params.major = major;
	if (nation) params.nation = nation;
	if (hasReview) params.hasReview = hasReview === "true";

	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getUniversities(client, params);

	return Response.json(response);
}
