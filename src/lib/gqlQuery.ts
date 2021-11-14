import type { FetchFunc } from './types.d';
import config from '../shopify.config';

const { storeDomain, graphqlApiVersion, storefrontToken } = config;

export const gqlQuery = (
	fetch: FetchFunc,
	query: string,
	variables: Record<string, unknown> = {}
): Promise<unknown> =>
	fetch(`https://${storeDomain}/api/${graphqlApiVersion}/graphql.json`, {
		method: 'POST',
		headers: {
			'X-Shopify-Storefront-Access-Token': storefrontToken,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ query, variables })
	})
		.then((response) => response.json())
		.then(({ data }) => data);
