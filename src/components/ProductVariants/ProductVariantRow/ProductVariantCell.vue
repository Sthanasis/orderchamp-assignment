<template>
  <td
    class="p-2"
    :class="{
      'border-bordergrey border-solid border-b': withBottomBorder,
    }"
  >
    <slot />
  </td>
</template>
<script lang="ts" setup>
defineProps<{
  withRightBorder?: boolean;
  withBottomBorder?: boolean;
}>();
</script>
