export type FetchFunc = (
	string,
	object
) => Promise<{
	json: () => Promise<{
		data: unknown;
	}>;
}>;
