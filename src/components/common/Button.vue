<template>
  <button
    :class="{
      'text-3xl': variant === 'icon',
      'opacity-20': disabled,
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
    variant?: 'icon' | 'primary' | 'secondary' | 'default';
  }>(),
  { variant: 'default' }
);
</script>
