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
    <template #reviews>
      <Text>{{ avgReviewScore.toFixed(1) }} ({{ totalReviews }} Reviews)</Text>
    </template>
  </ProductReviewWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '~/store/cart';
import { useProductReviewStore } from '~/store/reviews';
import StarIcon from '../common/StarIcon.vue';
import Text from '../common/Text.vue';
import ProductReviewWrapper from './ProductReviewWrapper.vue';

const reviewStore = useProductReviewStore();
const cartStore = useCartStore();
const { minimumOrderAmount } = storeToRefs(cartStore);
const { brand, totalReviewScore, totalReviews, avgReviewScore } =
  storeToRefs(reviewStore);
</script>
