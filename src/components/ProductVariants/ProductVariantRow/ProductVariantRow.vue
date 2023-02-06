<template>
  <ProductVariantCell
    with-right-border
    :with-bottom-border="!isLast"
  >
    <div class="flex justify-center items-center">
      <Button
        variant="icon"
        class="text-textgrey"
        :disabled="variant.quantity === 0"
        @click="$emit('subtract', variant.id)"
      >
        -
      </Button>
      <Text class="w-5 text-center text-ellipsis overflow-hidden">
        {{ variant.quantity }}
      </Text>
      <Button
        variant="icon"
        class="text-textgrey"
        @click="$emit('add', variant.id)"
      >
        +
      </Button>
    </div>
  </ProductVariantCell>
  <ProductVariantCell
    class="w-48 text-start"
    with-right-border
    :with-bottom-border="!isLast"
  >
    <Text> {{ variant.variant }} </Text>
  </ProductVariantCell>
  <ProductVariantCell
    with-right-border
    :with-bottom-border="!isLast"
  >
    <Text> €{{ variant.price }} </Text>
  </ProductVariantCell>
  <ProductVariantCell
    with-right-border
    :with-bottom-border="!isLast"
  >
    <Text> €{{ variant.msrp }} </Text>
  </ProductVariantCell>
  <ProductVariantCell
    class="text-center"
    :with-bottom-border="!isLast"
  >
    <Text>
      <FontAwesomeIcon
        v-if="variant.stock"
        class="text-success"
        :icon="faCircleCheck"
      />
    </Text>
  </ProductVariantCell>
</template>

<script lang="ts" setup>
import { VariantType } from '~/types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Text from '~/components/common/Text.vue';
import Button from '~/components/common/Button.vue';
import ProductVariantCell from './ProductVariantCell.vue';

defineEmits<{
  (e: 'subtract', id: string): void;
  (e: 'add', id: string): void;
}>();
defineProps<{
  variant: VariantType;
  isLast: boolean;
}>();
</script>
