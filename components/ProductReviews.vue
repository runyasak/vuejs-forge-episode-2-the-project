<script lang="ts" setup>
import { useAsyncState } from "@vueuse/core";

const props = defineProps({ productId: String });

const api = useDeskree();

const { state: reviews } = useAsyncState(
  () => api.reviews.get(props.productId),
  null
);

const reviewsCount = computed(() => reviews.value?.data.length || 0);

const averageRating = computed(() => {
  if (!reviews.value) {
    return 0;
  }

  const count = reviews.value.data.length;
  const ratingSum = reviews.value.data
    .map((i: any) => i.attributes.rating)
    .reduce((a: number, b: number) => a + b, 0);

  return (ratingSum / count).toFixed(1);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <span class="text-2xl">Customer Reviews and Ratings</span>
    <div class="flex gap-8 items-center">
      <div class="p-6 border-2 border-primary rounded-xl h-fit">
        <div class="whitespace-nowrap">
          <span class="text-4xl"> {{ averageRating }} </span>
          out of <span class="text-4xl">5</span>
        </div>
        <span>({{ reviewsCount }} Reviews)</span>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <div class="flex gap-4 items-center">
          <span class="whitespace-nowrap">1 Stars</span>
          <input
            type="range"
            min="0"
            max="100"
            value="60"
            class="range range-xs"
          />
          <span class="whitespace-nowrap">(2 Reviews)</span>
        </div>
        <div class="flex gap-4 items-center">
          <span class="whitespace-nowrap">2 Stars</span>
          <input
            type="range"
            min="0"
            max="100"
            value="60"
            class="range range-xs"
          />
          <span class="whitespace-nowrap">(2 Reviews)</span>
        </div>
        <div class="flex gap-4 items-center">
          <span class="whitespace-nowrap">3 Stars</span>
          <input
            type="range"
            min="0"
            max="100"
            value="60"
            class="range range-xs"
          />
          <span class="whitespace-nowrap">(2 Reviews)</span>
        </div>
        <div class="flex gap-4 items-center">
          <span class="whitespace-nowrap">4 Stars</span>
          <input
            type="range"
            min="0"
            max="100"
            value="60"
            class="range range-xs"
          />
          <span class="whitespace-nowrap">(2 Reviews)</span>
        </div>
        <div class="flex gap-4 items-center">
          <span class="whitespace-nowrap">5 Stars</span>
          <input
            type="range"
            min="0"
            max="100"
            value="60"
            class="range range-xs"
          />
          <span class="whitespace-nowrap">(2 Reviews)</span>
        </div>
      </div>
    </div>
    <div class="flex">
      <a class="link">Write a Review</a>
      <div class="divider divider-horizontal"></div>
      <a class="link">Hide All Reviews</a>
    </div>

    <div class="border border-gray rounded-lg p-8 flex flex-col gap-4">
      <div class="rating">
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-primary"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-primary"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-primary"
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-primary"
          checked
        />
        <input
          type="radio"
          name="rating-2"
          class="mask mask-star-2 bg-primary"
        />
      </div>
      <span class="text-xl font-bold"> Happy Customer </span>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
        dignissimos unde doloremque commodi ratione eum. Nostrum, consequuntur
        et. Dignissimos accusamus laboriosam esse eveniet aliquam minima natus,
        mollitia voluptate molestias repellat!
      </span>
    </div>
  </div>
</template>
