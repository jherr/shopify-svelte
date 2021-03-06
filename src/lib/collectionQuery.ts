import type { FetchFunc } from './types.d';
import { gqlQuery } from '../lib/gqlQuery';

const collectionQueryGQL = `query CollectionDetails($handle: String!, $country: CountryCode, $numProducts: Int!, $numProductMetafields: Int = 0, $numProductVariants: Int = 0, $numProductMedia: Int = 1, $numProductVariantMetafields: Int = 0, $numProductVariantSellingPlanAllocations: Int = 0, $numProductSellingPlanGroups: Int = 0, $numProductSellingPlans: Int = 0) @inContext(country: $country) {
  collection(handle: $handle) {
    id
    title
    descriptionHtml
    products(first: $numProducts) {
      edges {
        node {
          vendor
          ...ProductProviderFragment
        }
      }
      pageInfo {
        hasNextPage
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
	vendor: string;
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

interface PageInfo {
	hasNextPage: boolean;
}

interface Product {
	edges: Edge[];
	pageInfo: PageInfo;
}

export interface CollectionQueryResult {
	id: string;
	title: string;
	descriptionHtml: string;
	products: Product;
}

export const collectionQuery = (
	fetch: FetchFunc,
	handle: string,
	numProducts = 20,
	country = 'US'
): Promise<CollectionQueryResult> =>
	gqlQuery(fetch, collectionQueryGQL, {
		numProducts,
		country,
		handle
	}).then(({ collection }) => collection);
