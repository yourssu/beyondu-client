import ky from "ky";

export function createApiClient(baseUrl: string) {
	return ky.create({
		prefixUrl: baseUrl,
		retry: 0,
		timeout: 10_000,
	});
}
