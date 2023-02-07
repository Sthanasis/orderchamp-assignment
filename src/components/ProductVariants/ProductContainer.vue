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

const productStore = useProductStore();
const { subtractQuantity, setTotalOrderAmount, addQuantity } = productStore;
const { variants, title, loading, totalOrderAmount } =
  storeToRefs(productStore);
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

onMounted(productStore.loadProduct);
</script>
