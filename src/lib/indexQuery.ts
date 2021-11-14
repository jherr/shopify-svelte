import type { FetchFunc } from './types.d';
import { gqlQuery } from '../lib/gqlQuery';

const indexQueryGQL = `query indexContent($country: CountryCode, $numCollections: Int = 2, $numProducts: Int = 3, $numProductMetafields: Int = 0, $numProductVariants: Int = 250, $numProductMedia: Int = 1, $numProductVariantMetafields: Int = 10, $numProductVariantSellingPlanAllocations: Int = 0, $numProductSellingPlanGroups: Int = 0, $numProductSellingPlans: Int = 0) @inContext(country: $country) {
  collections(first: $numCollections) {
    edges {
      node {
        descriptionHtml
        description
        handle
        id
        title
        image {
          ...ImageFragment
        }
        products(first: $numProducts) {
          edges {
            node {
              ...ProductProviderFragment
            }
          }
        }
      }
    }
  }
}

fragment ProductProviderFragment on Product {
  compareAtPriceRange {
    maxVariantPrice {
      ...MoneyFragment
    }
    minVariantPrice {
      ...MoneyFragment
    }
  }
  descriptionHtml
  handle
  id
  media(first: $numProductMedia) {
    edges {
      node {
        ...MediaFileFragment
      }
    }
  }
  metafields(first: $numProductMetafields) {
    edges {
      node {
        ...MetafieldFragment
      }
    }
  }
  priceRange {
    maxVariantPrice {
      ...MoneyFragment
    }
    minVariantPrice {
      ...MoneyFragment
    }
  }
  title
  variants(first: $numProductVariants) {
    edges {
      node {
        ...VariantFragment
      }
    }
  }
  sellingPlanGroups(first: $numProductSellingPlanGroups) {
    edges {
      node {
        ...SellingPlanGroupsFragment
      }
    }
  }
}

fragment MediaFileFragment on Media {
  ... on MediaImage {
    mediaContentType
    image {
      ...ImageFragment
    }
  }
  ... on Video {
    mediaContentType
    ...VideoFragment
  }
  ... on ExternalVideo {
    mediaContentType
    ...ExternalVideoFragment
  }
  ... on Model3d {
    mediaContentType
    ...Model3DFragment
  }
}

fragment MetafieldFragment on Metafield {
  id
  type
  namespace
  key
  value
  createdAt
  updatedAt
  description
}

fragment VariantFragment on ProductVariant {
  id
  title
  availableForSale
  image {
    ...ImageFragment
  }
  ...UnitPriceFragment
  priceV2 {
    ...MoneyFragment
  }
  compareAtPriceV2 {
    ...MoneyFragment
  }
  selectedOptions {
    name
    value
  }
  metafields(first: $numProductVariantMetafields) {
    edges {
      node {
        ...MetafieldFragment
      }
    }
  }
  sellingPlanAllocations(first: $numProductVariantSellingPlanAllocations) {
    edges {
      node {
        priceAdjustments {
          compareAtPrice {
            ...MoneyFragment
          }
          perDeliveryPrice {
            ...MoneyFragment
          }
          price {
            ...MoneyFragment
          }
          unitPrice {
            ...MoneyFragment
          }
        }
        sellingPlan {
          ...SellingPlanFragment
        }
      }
    }
  }
}

fragment SellingPlanGroupsFragment on SellingPlanGroup {
  sellingPlans(first: $numProductSellingPlans) {
    edges {
      node {
        ...SellingPlanFragment
      }
    }
  }
  appName
  name
  options {
    name
    values
  }
}

fragment MoneyFragment on MoneyV2 {
  currencyCode
  amount
}

fragment ImageFragment on Image {
  id
  url
  altText
  width
  height
}

fragment VideoFragment on Video {
  id
  previewImage {
    url
  }
  sources {
    mimeType
    url
  }
}

fragment ExternalVideoFragment on ExternalVideo {
  id
  embeddedUrl
  host
}

fragment Model3DFragment on Model3d {
  id
  alt
  mediaContentType
  previewImage {
    url
  }
  sources {
    url
  }
}

fragment SellingPlanFragment on SellingPlan {
  id
  description
  name
  options {
    name
    value
  }
  priceAdjustments {
    orderCount
    adjustmentValue {
      ... on SellingPlanFixedAmountPriceAdjustment {
        adjustmentAmount {
          ...MoneyFragment
        }
      }
      ... on SellingPlanFixedPriceAdjustment {
        price {
          ...MoneyFragment
        }
      }
      ... on SellingPlanPercentagePriceAdjustment {
        adjustmentPercentage
      }
    }
  }
  recurringDeliveries
}

fragment UnitPriceFragment on ProductVariant {
  unitPriceMeasurement {
    measuredType
    quantityUnit
    quantityValue
    referenceUnit
    referenceValue
  }
  unitPrice {
    ...MoneyFragment
  }
}`;

interface Image {
	id: string;
	url: string;
	altText: string;
	width: number;
	height: number;
}

interface MaxVariantPrice {
	currencyCode: string;
	amount: string;
}

interface MinVariantPrice {
	currencyCode: string;
	amount: string;
}

interface CompareAtPriceRange {
	maxVariantPrice: MaxVariantPrice;
	minVariantPrice: MinVariantPrice;
}

interface Image {
	id: string;
	url: string;
	altText: string;
	width: number;
	height: number;
}

interface Node {
	mediaContentType: string;
	image: Image;
}

interface Edge {
	node: Node;
}

interface Media {
	edges: Edge[];
}

interface Metafield {
	edges: unknown[];
}

interface MaxVariantPrice {
	currencyCode: string;
	amount: string;
}

interface MinVariantPrice {
	currencyCode: string;
	amount: string;
}

interface PriceRange {
	maxVariantPrice: MaxVariantPrice;
	minVariantPrice: MinVariantPrice;
}

interface Image {
	id: string;
	url: string;
	altText: string;
	width: number;
	height: number;
}

interface UnitPriceMeasurement {
	measuredType?: unknown;
	quantityUnit?: unknown;
	quantityValue: number;
	referenceUnit?: unknown;
	referenceValue: number;
}

interface PriceV2 {
	currencyCode: string;
	amount: string;
}

interface SelectedOption {
	name: string;
	value: string;
}

interface Metafield {
	edges: unknown[];
}

interface SellingPlanAllocation {
	edges: unknown[];
}

interface Node {
	id: string;
	title: string;
	availableForSale: boolean;
	image: Image;
	unitPriceMeasurement: UnitPriceMeasurement;
	unitPrice?: unknown;
	priceV2: PriceV2;
	compareAtPriceV2?: unknown;
	selectedOptions: SelectedOption[];
	metafields: Metafield;
	sellingPlanAllocations: SellingPlanAllocation;
}

interface Edge {
	node: Node;
}

interface Variant {
	edges: Edge[];
}

interface SellingPlanGroup {
	edges: unknown[];
}

interface Node {
	compareAtPriceRange: CompareAtPriceRange;
	descriptionHtml: string;
	handle: string;
	id: string;
	media: Media;
	metafields: Metafield;
	priceRange: PriceRange;
	title: string;
	variants: Variant;
	sellingPlanGroups: SellingPlanGroup;
}

interface Edge {
	node: Node;
}

interface Product {
	edges: Edge[];
}

interface Node {
	descriptionHtml: string;
	description: string;
	handle: string;
	id: string;
	title: string;
	image: Image;
	products: Product;
}

interface Edge {
	node: Node;
}

export interface CollectionsQueryResult {
	edges: Edge[];
}

export const indexQuery = (fetch: FetchFunc, country = 'US'): Promise<CollectionsQueryResult> =>
	gqlQuery(fetch, indexQueryGQL, {
		country
	}).then(({ collections }) => collections);
