import { acceptHMRUpdate, defineStore } from 'pinia';

interface IProductReviewState {
  brand: string;
  totalReviewScore: number;
  avgReviewScore: number;
  totalReviews: number;
}

const initialState = {
  brand: '',
  totalReviewScore: 0,
  avgReviewScore: 0,
  totalReviews: 0,
};

export const useProductReviewStore = defineStore('review', {
  state: (): IProductReviewState => initialState,
  actions: {
    setProductReviewStore(obj: IProductReviewState) {
      this.$state = obj;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useProductReviewStore, import.meta.hot)
  );
}
