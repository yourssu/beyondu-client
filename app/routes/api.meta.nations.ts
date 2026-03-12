import { createApiClient, getNations } from "~/shared/api";

import type { Route } from "./+types/api.meta.nations";

export async function loader({ context }: Route.LoaderArgs) {
	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getNations(client);

	return Response.json(response);
}
