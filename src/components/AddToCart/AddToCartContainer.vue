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
      <Button
        variant="favorite"
        @click="toggleFavorite"
      >
        <FontAwesomeIcon
          :icon="icon"
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
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import Text from '../common/Text.vue';
import AddToCartWrapper from './AddToCartWrapper.vue';
import Button from '../common/Button.vue';
import { useCartStore } from '~/store/cart';

const store = useCartStore();
const { inStock, leadTime, totalOrderAmount } = storeToRefs(store);
const isFavorite = ref(false);
const icon = computed(() => (isFavorite.value ? faHeart : faHeartRegular));
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>
