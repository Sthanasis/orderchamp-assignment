<template>
  <Text tag="span">
    {{ title }}
  </Text>
</template>
<script lang="ts" setup>
import Text from '../Text.vue';
defineProps<{
  title: string;
}>();
</script>
