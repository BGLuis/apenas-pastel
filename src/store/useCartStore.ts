import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, DeliveryType, Product, ProductAddon } from "@/types";
import { PRODUCTS, PRODUCT_ADDONS } from "@/data/menu";

const FREE_DELIVERY_THRESHOLD = 40.0;
const DELIVERY_FEE = 5.0;

interface CartState {
  items: CartItem[];
  deliveryType: DeliveryType;
  lastAddedItem: CartItem | null;
  addItem: (product: Product, quantity?: number, selectedAddons?: ProductAddon[], notes?: string) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryType: (type: DeliveryType) => void;
  undoLastAdd: () => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getFreeDeliveryRemaining: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      deliveryType: "delivery",
      lastAddedItem: null,

      addItem: (product, quantity = 1, selectedAddons = [], notes = "") => {
        const addonsCost = selectedAddons.reduce((sum, a) => sum + a.price, 0);
        const itemPrice = product.price + addonsCost;
        const itemTotal = itemPrice * quantity;

        const cartId = `${product.id}-${selectedAddons.map((a) => a.id).sort().join("_")}-${notes}`;

        const existingIndex = get().items.findIndex((item) => item.cartId === cartId);

        let newItems: CartItem[];
        let addedItem: CartItem;

        if (existingIndex > -1) {
          newItems = [...get().items];
          const existing = newItems[existingIndex];
          const newQty = existing.quantity + quantity;
          existing.quantity = newQty;
          existing.itemTotal = itemPrice * newQty;
          addedItem = existing;
        } else {
          addedItem = {
            cartId,
            product,
            quantity,
            selectedAddons,
            notes,
            itemTotal,
          };
          newItems = [...get().items, addedItem];
        }

        set({ items: newItems, lastAddedItem: addedItem });
      },

      removeItem: (cartId) => {
        set({ items: get().items.filter((item) => item.cartId !== cartId) });
      },

      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartId);
          return;
        }

        const newItems = get().items.map((item) => {
          if (item.cartId === cartId) {
            const addonsCost = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
            const itemPrice = item.product.price + addonsCost;
            return {
              ...item,
              quantity,
              itemTotal: itemPrice * quantity,
            };
          }
          return item;
        });

        set({ items: newItems });
      },

      clearCart: () => set({ items: [] }),

      setDeliveryType: (deliveryType) => set({ deliveryType }),

      undoLastAdd: () => {
        const { lastAddedItem, items } = get();
        if (!lastAddedItem) return;
        set({
          items: items.filter((item) => item.cartId !== lastAddedItem.cartId),
          lastAddedItem: null,
        });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.itemTotal, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (get().deliveryType === "pickup" || subtotal >= FREE_DELIVERY_THRESHOLD) {
          return 0;
        }
        return DELIVERY_FEE;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getFreeDeliveryRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
      },
    }),
    {
      name: "apenas-pastel-cart-v2",
      partialize: (state) => ({
        items: state.items.filter((item) => !item.cartId.startsWith("mock-")),
        deliveryType: state.deliveryType,
      }),
    }
  )
);
