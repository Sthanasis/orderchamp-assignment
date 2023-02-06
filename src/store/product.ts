import { acceptHMRUpdate, defineStore } from 'pinia';
import type { ImageType, VariantType } from '~/types';

interface IProductState {
  title: string | null;
  images: ImageType[];
  loading: boolean;
  variants: VariantType[];
  selectedImage: ImageType | null;
}

export const useProductStore = defineStore('product', {
  state: (): IProductState => ({
    title: null,
    loading: false,
    images: [],
    variants: [],
    selectedImage: null,
  }),

  actions: {
    async loadProduct() {
      this.loading = false;
      const res = await import('~/assets/response');
      const { data } = res.default;
      const { images, variants, title } = data.storefrontBySlug.listing;

      this.images = images.edges.map(({ node }) => node);
      this.selectedImage = this.images[0];
      this.title = title;

      this.variants = variants.edges.map(({ node }) => {
        const { msrp, id, price, inventory, options, inventoryPolicy } = node;
        const variant = options.map((item) => item.value).join(' - ');
        const stock = inventoryPolicy === 'CONTINUE';
        return { msrp, id, price, quantity: inventory, variant, stock };
      });

      this.loading = false;
    },
    addQuantity(id: string) {
      this.variants = this.variants.map((v) => {
        if (v.id == id) {
          return { ...v, quantity: v.quantity + 1 };
        }
        return v;
      });
    },
    subtractQuantity(id: string) {
      this.variants = this.variants.map((v) => {
        if (v.id == id) {
          return { ...v, quantity: v.quantity - 1 };
        }
        return v;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
