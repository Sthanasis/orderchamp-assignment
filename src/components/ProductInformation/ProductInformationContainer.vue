<template>
  <ProductInformationWrapper>
    <template #title>
      <Text tag="h1"> Information </Text>
    </template>
    <template #arrow>
      <Button @click="expandToggle">
        <FontAwesomeIcon :icon="isExpanded ? faChevronUp : faChevronDown" />
      </Button>
    </template>
    <template #description>
      <Text
        v-show="isExpanded"
        tag="p"
      >
        {{ text !== '' ? text : `${description.substring(0, LIMIT)}...` }}
        <Button @click="handleToggleText">
          {{ readMore ? 'Read Less' : 'Read More' }}
        </Button>
      </Text>
    </template>
  </ProductInformationWrapper>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useProductStore } from '~/store/product';
import Text from '../common/Text.vue';
import ProductInformationWrapper from './ProductInformationWrapper.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/Button.vue';

const LIMIT = 300;
const productStore = useProductStore();
const { description } = storeToRefs(productStore);
const text = ref(description.value);
const isExpanded = ref(true);
const readMore = ref(false);

const expandToggle = () => {
  isExpanded.value = !isExpanded.value;
};

const handleToggleText = () => {
  if (readMore.value) {
    text.value = `${text.value.substring(0, LIMIT)}...`;
  } else {
    text.value = description.value;
  }
  readMore.value = !readMore.value;
};
</script>
