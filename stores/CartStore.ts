import { watchDebounced } from "@vueuse/core";
import { Product } from "./ProductStore";

export interface CartItem {
  item: Product;
  amount: number;
}

export const useCartStore = defineStore("CartStore", () => {
  const deskree = useDeskree();

  const items = ref<CartItem[]>([]);

  const isFirstLoad = ref(false);

  const loading = ref(false);

  const taxRate = 0.1;

  watchDebounced(
    items,
    () => {
      if (isFirstLoad.value) return;
      if (!deskree.user.get()) return;

      deskree.user.updateCart(items.value);
    },
    {
      debounce: 500,
      deep: true,
    }
  );

  deskree.auth.onAuthStateChange(async () => {
    try {
      isFirstLoad.value = true;
      loading.value = true;
      const res = await deskree.user.getCart();
      res.products.forEach((cart: CartItem) => addItem(cart.item, cart.amount));
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
      setTimeout(() => (isFirstLoad.value = false), 1000);
    }
  });

  const totalCount = computed(() =>
    items.value.reduce((acc, cur) => acc + cur.amount, 0)
  );

  const subtotal = computed(() =>
    items.value.reduce(
      (acc, cur) => acc + cur.item.fields.price * cur.amount,
      0
    )
  );

  const grandTotal = computed(() => taxTotal.value + subtotal.value);

  const isEmpty = computed(() => items.value.length === 0);

  const addItem = (newProduct: Product, amount = 1) => {
    const existingItem = items.value.find(
      ({ item }) => item.sys.id === newProduct.sys.id
    );

    if (existingItem) {
      existingItem.amount += amount;
    } else {
      items.value.push({ item: newProduct, amount });
    }
  };

  const removeItems = (productIdList: string[]) => {
    items.value = items.value.filter(
      ({ item }) => !productIdList.includes(item.sys.id)
    );
  };

  const taxTotal = computed(() => subtotal.value * taxRate);

  return {
    items,
    totalCount,
    subtotal,
    grandTotal,
    taxRate,
    isEmpty,
    loading,
    taxTotal,
    addItem,
    removeItems,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
