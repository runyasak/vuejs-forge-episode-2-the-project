<script lang="ts" setup>
import { CartItem } from "~~/stores/CartStore";

const cartStore = useCartStore();
const orderedProducts = ref<CartItem[]>([]);
const orderedTotal = ref(0);
const loading = ref(true);
const unwatch = watch(
  () => cartStore.isFirstLoad,
  (b) => {
    if (!b) {
      orderedProducts.value = JSON.parse(JSON.stringify(cartStore.items));
      orderedTotal.value = cartStore.subtotal;
      // reset the cart
      cartStore.reset();
      unwatch();
      loading.value = false;
    }
  }
);
</script>
<template>
  <div v-if="loading" class="flex justify-center items-center mt-10">
    <AppSpinner />
  </div>

  <div v-else class="mt-10 max-w-6xl mx-auto p-5">
    <h1 class="text-3xl">Thank you for your purchase!</h1>
    <h2>Order Summary</h2>
    <ul class="ml-5 list-inside list-disc">
      <li v-for="{ item } in orderedProducts" :key="item.sys.id">
        {{ item.fields.name }}
      </li>
    </ul>
    <strong>Total: </strong>${{ orderedTotal / 100 }}
  </div>
</template>
