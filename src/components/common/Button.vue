<template>
  <button
    :class="{
      'text-3xl': variant === 'icon',
      'opacity-40': disabled,
      'py-4 px-3 mt-5 mx-0 bg-success text-white flex justify-between w-full':
        variant === 'checkout',
      'py-3 px-3 mt-5 mx-0 bg-black text-white flex justify-center items-center w-full':
        variant === 'favorite',
    }"
    class="mx-2"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { EmitClickArgsType } from '~/types';

defineEmits<{
  (e: 'click', args: EmitClickArgsType): void;
}>();
withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: 'icon' | 'checkout' | 'favorite' | 'default';
  }>(),
  { variant: 'default' }
);
</script>
