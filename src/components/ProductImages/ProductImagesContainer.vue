<template>
  <ProductImagesWrapper
    v-if="title"
    :images="images"
    @select-image="productStore.selectImage"
  >
    <template #side-images="{ image }">
      <Image
        :src="image.small"
        :alt="title"
      />
    </template>
    <template #default>
      <Image
        v-if="selectedImage"
        :src="selectedImage.big"
        :alt="title"
      />
    </template>
  </ProductImagesWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import Image from '../common/Image.vue';
import ProductImagesWrapper from './ProductImagesWrapper.vue';

const productStore = useProductStore();
const { images, title, selectedImage } = storeToRefs(productStore);
</script>
