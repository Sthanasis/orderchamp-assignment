<template>
  <div class="flex flex-col">
    <div class="text-warmGray-400">
      <slot />
    </div>
    <div>
      <slot
        v-for="i in totalStars"
        :key="i"
        name="stars"
        v-bind="{ index: i }"
      />
      <slot name="reviews" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalStars: number;
}>();
</script>
