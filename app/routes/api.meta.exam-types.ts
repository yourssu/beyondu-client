import { createApiClient, getExamTypes } from "~/shared/api";

import type { Route } from "./+types/api.meta.exam-types";

export async function loader({ context }: Route.LoaderArgs) {
	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getExamTypes(client);

	return Response.json(response);
}
