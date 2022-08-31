<script lang="ts" setup>
const { rating, title, text } = defineProps({
  rating: Number,
  title: String,
  text: String,
});
</script>
<template>
  <div class="border border-gray rounded-lg p-8 flex flex-col gap-4">
    <div class="rating">
      <input
        v-for="i in 5"
        :key="i"
        type="radio"
        name="rating-2"
        class="mask mask-star-2 bg-primary"
        :checked="rating === i"
      />
    </div>
    <span class="text-xl font-bold"> {{ title }} </span>
    <span>{{ text }}</span>
  </div>
</template>
