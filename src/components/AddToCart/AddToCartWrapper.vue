<template>
  <div class="mt-5">
    <div
      v-if="inStock"
      class="text-success flex flex-col"
    >
      <slot name="stock" />
    </div>
    <div class="flex w-[80%]">
      <slot name="checkout" />
    </div>
    <div class="flex w-[60%]">
      <slot name="favorites" />
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  inStock: boolean;
}>();
</script>
