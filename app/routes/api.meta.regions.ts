import { createApiClient, getRegions } from "~/shared/api";

import type { Route } from "./+types/api.meta.regions";

export async function loader({ context }: Route.LoaderArgs) {
	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getRegions(client);

	return Response.json(response);
}
