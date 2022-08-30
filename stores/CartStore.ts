import { Product } from "./ProductStore";

export interface CartItem {
  item: Product;
  amount: number;
}

export const useCartStore = defineStore("CartStore", () => {
  const items = ref<CartItem[]>([]);

  const taxRate = 0.1;

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

  const addItem = (newProduct: Product, count = 1) => {
    const existingItem = items.value.find(
      ({ item }) => item.sys.id === newProduct.sys.id
    );

    if (existingItem) {
      existingItem.amount += count;
    } else {
      items.value.push({ item: newProduct, amount: 1 });
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
    taxTotal,
    addItem,
    removeItems,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
