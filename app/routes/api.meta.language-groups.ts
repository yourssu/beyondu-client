import { createApiClient, getLanguageGroups } from "~/shared/api";

import type { Route } from "./+types/api.meta.language-groups";

export async function loader({ context }: Route.LoaderArgs) {
	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getLanguageGroups(client);

	return Response.json(response);
}
