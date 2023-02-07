<template>
  <component
    :is="tag ?? 'span'"
    :class="{
      'font-bold my-4 text-2xl': tag === 'h1',
      'underline cursor-pointer': tag === 'a',
    }"
  >
    <slot />
  </component>
</template>
<script lang="ts" setup>
type TagType = 'span' | 'p' | 'h1' | 'a';
defineProps<{
  tag?: TagType;
}>();
</script>
