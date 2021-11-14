<script context="module">
  import { collectionQuery } from "../../lib/collectionQuery";

	export async function load({page, fetch}) {
    const products = await collectionQuery(fetch, page?.params?.name ?? "freestyle-collection");
    const productItems = products?.products?.edges?.map((product) => {
      return {
        title: product.node.title,
        price: {
          amount: parseFloat(product.node.priceRange.maxVariantPrice.amount),
          currency: product.node.priceRange.maxVariantPrice.currencyCode,
        },
        images: product.node.media.edges.map((image) => {
          return {
            url: image?.node?.image?.url,
            altText: image?.node?.image?.altText,
            width: image?.node?.image?.width,
            height: image?.node?.image?.height,
          };
        }),
      };
    });
    return {
			props: {
				products,
        productItems
			}
		};
	}
</script>

<script lang="ts">
	export let products;
	export let productItems: {
    title: string;
    price: {
      amount: number;
      currency: string;
    };
    images: {
      url: string;
      altText: string;
      width: number;
      height: number;
    }
  }[];
  export const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
</script>

  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="text-center font-bold text-5xl my-5">{products.title}</div>
    <div class="text-center">
      {@html products.descriptionHtml}
    </div>
    
    <h2 id="products-heading" class="sr-only">Products</h2>

    <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">

      {#each productItems as item}
        <div>
          <div class="relative">
            <div class="relative w-full h-96 rounded-lg overflow-hidden">
              <img src={item.images[0].url} alt={item.images[0].altText} class="transform transition duration-500 hover:scale-110">
            </div>
            <div class="relative mt-4">
              <h3 class="text-sm font-medium text-gray-900">{item.title}</h3>
            </div>
            <div class="absolute top-0 inset-x-0 h-96 rounded-lg p-4 flex items-end justify-end overflow-hidden pointer-events-none">
              <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"></div>
              <div class="relative text-lg text-white text-right">
                <div class="font-semibold">
                  {currency.format(item.price.amount)}
                </div>
                <div>
                  {item.price.currency}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <button class="w-full relative flex bg-gray-200 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-400">Add to bag<span class="sr-only">, {item.title}</span></button>
          </div>
        </div>
      {/each}

    </div>
  </div>
