import type { FetchFunc } from './types.d';
import { gqlQuery } from '../lib/gqlQuery';

const welcomeContentQueryGQL = `query welcomeContent {
  shop {
    name
  }
  collections(first: 250) {
    edges {
      node {
        handle
        title
      }
    }
  }
}`;

export interface WelcomeContentQueryResult {
	shop: {
		name: string;
	};
	collections: {
		edges: {
			node: {
				handle: string;
				title: string;
			};
		}[];
	};
}

export const welcomeContentQuery = (fetch: FetchFunc): Promise<WelcomeContentQueryResult> =>
	gqlQuery(fetch, welcomeContentQueryGQL) as Promise<WelcomeContentQueryResult>;
