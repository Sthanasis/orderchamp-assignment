<template>
  <ProductReviewWrapper :total-stars="totalReviewScore">
    <template #default>
      <Text>
        <Text tag="a">{{ brand }} </Text>
        - €{{ minimumOrderAmount }} Order minimum
      </Text>
    </template>
    <template #stars="{ index }">
      <StarIcon :colored="index <= avgReviewScore" />
    </template>
  </ProductReviewWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useProductStore } from '~/store/product';
import StarIcon from '../common/StarIcon.vue';
import Text from '../common/Text.vue';
import ProductReviewWrapper from './ProductReviewWrapper.vue';

const productStore = useProductStore();
const {
  brand,
  minimumOrderAmount,
  totalReviewScore,
  totalReviews,
  avgReviewScore,
} = storeToRefs(productStore);
</script>
