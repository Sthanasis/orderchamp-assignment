<template>
  <FontAwesomeIcon
    :icon="colored ? fullStar : emptyStar"
    class="text-yellow-400"
  />
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';

defineProps<{
  colored: boolean;
}>();
</script>
