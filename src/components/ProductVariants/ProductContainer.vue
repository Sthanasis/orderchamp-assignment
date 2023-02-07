<template>
  <div v-if="loading">
    <Text tag="h1"> Loading... </Text>
  </div>
  <ProductWrapper v-else>
    <template #header>
      <Text tag="h1"> {{ title }} </Text>
    </template>
    <template #content>
      <Table
        :table-columns="columns"
        :table-data="variants"
      >
        <template #table-columns="{ column }">
          <Header :title="column" />
        </template>
        <template #table-rows="{ data, isLast }">
          <ProductVariantRow
            :variant="data"
            :is-last="isLast"
            @add="handleAdd"
            @subtract="handleSubtract"
          />
        </template>
      </Table>
    </template>
  </ProductWrapper>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import ProductWrapper from './ProductWrapper.vue';
import Table from '../common/Table/Table.vue';
import ProductVariantRow from './ProductVariantRow/ProductVariantRow.vue';
import Header from '../common/Table/Header.vue';
import Text from '../common/Text.vue';
import { useCartStore } from '~/store/cart';

const productStore = useProductStore();
const cartStore = useCartStore();
const { subtractQuantity, addQuantity, loadProduct } = productStore;
const { setTotalOrderAmount } = cartStore;
const { variants, title, loading } = storeToRefs(productStore);
const { totalOrderAmount } = storeToRefs(cartStore);

const columns = ['Quantity', 'Variant', 'Price', 'MSRP', 'Stock'];
const handleAdd = (id: string) => {
  addQuantity(id);
  const variant = variants.value.find((v) => v.id === id);
  if (variant) {
    setTotalOrderAmount(totalOrderAmount.value + +variant.price);
  }
};

const handleSubtract = (id: string) => {
  subtractQuantity(id);
  const variant = variants.value.find((v) => v.id === id);
  if (variant) {
    setTotalOrderAmount(totalOrderAmount.value - +variant.price);
  }
};

onMounted(loadProduct);
</script>
