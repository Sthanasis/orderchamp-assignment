import { acceptHMRUpdate, defineStore } from 'pinia';
import type { ImageType, VariantType } from '~/types';

interface IProductState {
  title: string | null;
  images: ImageType[];
  loading: boolean;
  variants: VariantType[];
  selectedImage: ImageType | null;
  description: string;
  minimumOrderAmount: number;
  totalOrderAmount: number;
  brand: string;
  totalReviewScore: number;
  avgReviewScore: number;
  totalReviews: number;
  inStock: boolean;
}

const initialState = {
  title: null,
  loading: false,
  images: [],
  variants: [],
  selectedImage: null,
  description: '',
  minimumOrderAmount: 0,
  totalOrderAmount: 0,
  brand: '',
  totalReviewScore: 0,
  avgReviewScore: 0,
  totalReviews: 0,
  inStock: false,
};

export const useProductStore = defineStore('product', {
  state: (): IProductState => initialState,
  getters: {
    overMinOrderLimit: (state: IProductState) =>
      state.minimumOrderAmount <= state.totalOrderAmount,
  },
  actions: {
    async loadProduct() {
      this.loading = false;

      const res = await import('~/assets/response');
      const { data } = res.default;
      const {
        listing,
        minimumOrderAmount,
        name,
        reviewScore,
        realAverageReviewScore,
        reviews,
      } = data.storefrontBySlug;
      const { images, variants, title, description, inStock } = listing;

      this.brand = name;
      this.minimumOrderAmount = +minimumOrderAmount;
      this.title = title;
      this.description = description;
      this.totalReviewScore = reviewScore;
      this.avgReviewScore = realAverageReviewScore;
      this.totalReviews = reviews.totalCount;
      this.inStock = inStock;

      this.images = images.edges.map(({ node }) => node);
      this.selectedImage = this.images[0];

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
    selectImage(id: string) {
      const img = this.images.find((img) => img.id === id);
      if (img) this.selectedImage = img;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
