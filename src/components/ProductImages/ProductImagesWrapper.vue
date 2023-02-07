<template>
  <div class="flex flex-wrap-reverse lg:flex-nowrap px-5">
    <div
      class="flex lg:flex-col max-lg:my-5 max-lg:justify-center max-lg:w-full"
    >
      <div
        v-for="image in images"
        :key="image.id"
      >
        <Button @click="$emit('select-image', image.id)">
          <div
            class="flex h-16 w-16"
            :class="{
              'border border-bordergrey border-solid': true,
            }"
          >
            <slot
              name="side-images"
              v-bind="{ image }"
            />
          </div>
        </Button>
      </div>
    </div>
    <div class="h-max border border-bordergrey border-solid px-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageType } from '~/types';
import Button from '../common/Button.vue';

defineProps<{
  images: ImageType[];
}>();

defineEmits<{
  (e: 'select-image', id: string): void;
}>();
</script>
