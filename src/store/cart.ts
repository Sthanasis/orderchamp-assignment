import { acceptHMRUpdate, defineStore } from 'pinia';

interface ICartState {
  minimumOrderAmount: number;
  totalOrderAmount: number;
  inStock: boolean;
  leadTime: string;
}

const initialState = {
  minimumOrderAmount: 0,
  totalOrderAmount: 0,
  inStock: false,
  leadTime: '',
};

export const useCartStore = defineStore('cart', {
  state: (): ICartState => initialState,
  getters: {
    overMinOrderLimit: (state: ICartState) =>
      state.minimumOrderAmount <= state.totalOrderAmount,
  },
  actions: {
    setCartStore(obj: ICartState) {
      this.$state = obj;
    },
    setTotalOrderAmount(price: number) {
      this.totalOrderAmount = price;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
