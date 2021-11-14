<script context="module">
  import { welcomeContentQuery } from '../lib/welcomeContentQuery';

  export async function load({ fetch }) {
    const data = await welcomeContentQuery(fetch);
    return {
      props: {
        data
      }
    };
  }
</script>

<script lang="ts">
  import '../styles/tailwind-output.css';
  import type { WelcomeContentQueryResult } from '../lib/welcomeContentQuery';

  export let data: WelcomeContentQueryResult;
</script>

<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="-ml-2 mr-2 flex items-center md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center text-3xl font-bold">
          <a href="/">{data.shop.name}</a>
        </div>
        {#each data.collections.edges as collection}
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <a
              href={`/collections/${collection.node.handle}`}
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              {collection.node.title}
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="md:hidden" id="mobile-menu">
    <div class="pt-2 pb-3 space-y-1">
      {#each data.collections.edges as collection}
        <a
          href={`/collections/${collection.node.handle}`}
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
        >
          {collection.node.title}
        </a>
      {/each}
    </div>
  </div>
</nav>

<div class="bg-gray-100">
  <slot />
</div>
