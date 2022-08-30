<script setup>
const productStore = useProductStore();
const loading = ref(false)
useAsyncData("products", async () => {
  try {
    loading.value = true
    await productStore.fetchProducts() 
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
});
</script>
<template>
  <div>
    <HomeHero />

    <div class="flex items-end justify-end mt-10 px-10 gap-2">
      <AppSpinner
        class="mb-2 transition-opacity opacity-0 duration-500 ease-in-out"
        :class="{'opacity-100': loading}">
      </AppSpinner>
      <ProductFilters />
    </div>

    <div
      v-if="productStore.products"
      class="gap-7 p-10 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap justify-items-stretch items-stretch"
    >
      <TransitionGroup name="products">
        <ProductCard
          v-for="product in productStore.products"
          :product="product"
          :key="product.sys.id"
          class="mb-5"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.product-card {
  transition: all 0.5s ease-in-out;
}

.products-enter-form {
  transform: scale(0.5) translateY(80px);
  opacity: 0;
}

.products-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.products-leave-active {
  position: absolute;
  z-index: -1;
  max-width: 300px;
}
</style>