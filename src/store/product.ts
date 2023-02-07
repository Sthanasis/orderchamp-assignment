import { useProductReviewStore } from './reviews';
import { useCartStore } from './cart';
import { acceptHMRUpdate, defineStore } from 'pinia';
import type { ImageType, VariantType } from '~/types';

interface IProductState {
  title: string | null;
  images: ImageType[];
  loading: boolean;
  variants: VariantType[];
  selectedImage: ImageType | null;
  description: string;
}

const initialState = {
  title: null,
  loading: false,
  images: [],
  variants: [],
  selectedImage: null,
  description: '',
};

export const useProductStore = defineStore('product', {
  state: (): IProductState => initialState,

  actions: {
    async loadProduct() {
      const { setCartStore } = useCartStore();
      const { setProductReviewStore } = useProductReviewStore();
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
      const { images, variants, title, description, inStock, leadTime } =
        listing;

      setCartStore({
        minimumOrderAmount: +minimumOrderAmount,
        inStock,
        leadTime,
        totalOrderAmount: 0,
      });
      setProductReviewStore({
        brand: name,
        totalReviews: reviews.totalCount,
        avgReviewScore: realAverageReviewScore,
        totalReviewScore: reviewScore,
      });

      const newImages = images.edges.map(({ node }) => node);
      const selectedImage = this.images[0];
      const newVariants = variants.edges.map(({ node }) => {
        const { msrp, id, price, inventory, options, inventoryPolicy } = node;
        const variant = options.map((item) => item.value).join(' - ');
        const stock = inventoryPolicy === 'CONTINUE';
        return { msrp, id, price, quantity: inventory, variant, stock };
      });

      this.setProductStore({
        title,
        description,
        images: newImages,
        selectedImage,
        variants: newVariants,
        loading: false,
      });
    },
    setProductStore(obj: IProductState) {
      this.$state = obj;
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
