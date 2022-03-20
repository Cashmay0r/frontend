<template>
  <div class="w-full h-12 rounded-lg bg-base-100 flex justify-start px-4 items-center">
    <p v-text="message" class="text-gray-400 text-sm" :class="active ? '' : 'line-through'"></p>
  </div>
</template>

<script setup>
  import {defineProps} from 'vue';

  defineProps({
    active: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  });
</script>
