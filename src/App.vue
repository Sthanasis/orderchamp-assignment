<template>
  <div class="flex w-screen h-screen py-10 overflow-auto">
    <div class="flex flex-wrap justify-center">
      <div class="w-1/2">
        <ProductImagesContainer />
        <ProductInformationContainer />
      </div>
      <div>
        <ProductReviewContainer />
        <ProductContainer />
        <AddToCartContainer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddToCartContainer from './components/AddToCart/AddToCartContainer.vue';
import ProductImagesContainer from './components/ProductImages/ProductImagesContainer.vue';
import ProductInformationContainer from './components/ProductInformation/ProductInformationContainer.vue';
import ProductReviewContainer from './components/ProductReview/ProductReviewContainer.vue';
import ProductContainer from './components/ProductVariants/ProductContainer.vue';
</script>
