<script context="module">
  import { indexQuery } from "../lib/indexQuery";

	export async function load({fetch}) {
    const collections = await indexQuery(fetch);
    return {
			props: {
				collections
			}
		};
	}
</script>

<script lang="ts">
	import type { CollectionsQueryResult } from "../lib/indexQuery";
	export let collections: CollectionsQueryResult;
</script>

<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
	<div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
		{#each collections.edges as edge}
			<div class="group aspect-w-6 aspect-h-4 rounded-lg overflow-hidden sm:aspect-h-4 sm:aspect-w-6 sm:row-span-2">
				<img src={edge.node.image.url} alt={edge.node.image.altText} class="object-center object-cover group-hover:opacity-75">
				<div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50"></div>
				<div class="p-6 flex items-end">
					<div>
						<h3 class="font-semibold text-white">
							<a href={`/collections/${edge.node.handle}`} class="text-xl font-bold">
								<span class="absolute inset-0"></span>
								{edge.node.title}
							</a>
						</h3>
						<p aria-hidden="true" class="mt-1 text-sm text-white">
							Shop now
						</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
