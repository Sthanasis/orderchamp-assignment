<template>
  <AddToCartWrapper :in-stock="inStock">
    <template #stock>
      <Text>
        <FontAwesomeIcon :icon="faCheck" />
        Available
      </Text>
      <Text> Ships directly from brand - {{ leadTime }} </Text>
    </template>
    <template #checkout>
      <Button
        variant="checkout"
        :disabled="!store.overMinOrderLimit"
      >
        <Text>ADD TO CART</Text>
        <Text>€ {{ totalOrderAmount.toFixed(2) }}</Text>
      </Button>
    </template>
    <template #favorites>
      <Button variant="favorite">
        <FontAwesomeIcon
          :icon="faHeart"
          class="mr-3"
        />
        <Text> ADD TO FAVORITES </Text>
      </Button>
    </template>
  </AddToCartWrapper>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faHeart } from '@fortawesome/free-solid-svg-icons';
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/store/product';
import Text from '../common/Text.vue';
import AddToCartWrapper from './AddToCartWrapper.vue';
import Button from '../common/Button.vue';

const store = useProductStore();

const { inStock, leadTime, totalOrderAmount } = storeToRefs(store);
</script>
