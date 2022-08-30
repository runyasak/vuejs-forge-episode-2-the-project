import { defineStore, acceptHMRUpdate } from "pinia";

export interface Product {
  metadata: { tags: [] };
  sys: {
    space: unknown[];
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: unknown[];
    revision: number;
    contentType: unknown[];
    locale: string;
  };
  fields: {
    name: string;
    summary: string;
    price: number;
    description: string;
    image: {
      fields: {
        description: string;
        file: {
          url: string;
          details: unknown;
          fileName: string;
          contentType: string;
        };
        title: string;
      };
    };
    heatLevel: string;
  };
}

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    const route = useRoute();
    return {
      /**
       * The listing of all the products
       */
      products: [] as Product[],

      /**
       * Different ways of fetching the listing of products (filters, order, search)
       */
      filters: {
        "fields.heatLevel": route.query["fields.heatLevel"] || "",
        order: route.query.order || "",
        query: route.query.query || "",
      },

      /**
       * A single project to show all the details of
       */
      singleProduct: null,
    };
  },
  getters: {
    activeFilters() {
      const clone = JSON.parse(JSON.stringify(this.filters));
      // remove blank object properties
      return Object.fromEntries(
        Object.entries(clone).filter(([_, v]) => v != null)
      );
    },
  },
  actions: {
    async fetchProducts() {
      const { $contentful } = useNuxtApp();
      const { items } = await $contentful.getEntries({
        content_type: "product",
        ...this.filters,
      });

      this.products = items;
      return this.products;
    },
    async fetchProduct(id: string) {
      const { $contentful } = useNuxtApp();
      const res = await $contentful.getEntry(id);

      this.singleProduct = res;
      return this.singleProduct;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
