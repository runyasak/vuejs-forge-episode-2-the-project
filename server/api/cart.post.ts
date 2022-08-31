import Stripe from "stripe";
import { CartItem } from "~~/stores/CartStore";

export default defineEventHandler(async (event) => {
  const body = await useBody<{ products: CartItem[] }>(event);
  const config = useRuntimeConfig();
  const stripeClient = new Stripe(config.stripeSecret, {
    apiVersion: "2022-08-01",
  });

  const { data: products } = await stripeClient.products.list({
    ids: body.products.map((product) => product.item.sys.id),
  });

  const lineItems = products.map((product) => ({
    price: String(product.default_price),
    quantity: body.products.find((p) => p.item.sys.id === product.id)?.amount,
  }));

  return stripeClient.checkout.sessions.create({
    cancel_url: "http://localhost:3000/cart",
    success_url: "http://localhost:3000/checkout/success",
    mode: "payment",
    line_items: lineItems,
  });
});
