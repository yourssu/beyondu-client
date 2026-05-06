import { createApiClient, getNationsByRegion } from "~/shared/api";

import type { Route } from "./+types/api.meta.nations-by-region";

export async function loader({ context }: Route.LoaderArgs) {
	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getNationsByRegion(client);

	return Response.json(response);
}
