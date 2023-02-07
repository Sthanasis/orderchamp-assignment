<template>
  <div class="px-5">
    <div class="flex justify-between border-t border-bordergrey mt-5">
      <slot name="title" />
      <slot name="arrow" />
    </div>
    <div class="flex flex-col">
      <slot name="description" />
    </div>
  </div>

  <slot />
</template>
