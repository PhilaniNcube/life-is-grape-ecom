import { Id, Doc } from '@/convex/_generated/dataModel';
import {  UpdateProducerSchema, UpdateProductVariantSchema } from '@/lib/schemas';
import { z } from 'zod';
import {create, createStore} from 'zustand';
import {persist} from 'zustand/middleware';

type Product = Doc<"products">;
type ProductVariant = Doc<"product_variants">;

export type GiftBox = {
  name: string;
  price: number;
  description: string;
  dimensions: string;
}

// create an interface of the cart item that constains the product and the quantity of that product in the cart and the the product variant the cart item should also contain a gift box option that is potentially undefined
export interface CartItem {
  product: Product;
  quantity: number;
  variant: ProductVariant;
  giftBox: GiftBox | undefined;
}

export type CartState = {
  cart: CartItem[];
}

export type CartStore = {
  cart: CartItem[];
  // add a product to the cart
  addToCart: (product: Product, variant: ProductVariant, giftBox?: GiftBox) => void;
  // remove a product from the cart by id and variant id
  removeFromCart: (id: Id<"products">, variantId: Id<"product_variants">) => void;
  // update the quantity of a product in the cart by id and variant id
  updateQuantity: (id: Id<"products">, variantId: Id<"product_variants">, quantity: number) => void;
  // clear the cart
  clearCart: () => void;
  incrementQuantity: (id: Id<"products">, variantId: Id<"product_variants">) => void;
  decrementQuantity: (id: Id<"products">, variantId: Id<"product_variants">) => void;
  // get the total number of items in the cart
  totalCartItems: () => number;
  // get the total price of the items in the cart
  totalCartPrice: () => number;
  isOpen: boolean;
  toggleCart: () => void;
}

export const createCartStore = (
  initState: CartState = {cart: []}
) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        // cart: [],
        ...initState,
        // implement the add to cart method that takes a product and a variant and an optional gift box
        addToCart: (product, variant, griftBox) => {
          // check if the product is already in the cart
          const cartItem = get().cart.find(
            item =>
              item.product._id === product._id &&
              item.variant._id === variant._id
          )

          // if the product is already in the cart, increment the quantity
          if (cartItem) {
            get().incrementQuantity(product._id, variant._id)
            return
          }

          // if the product is not in the cart, add the product to the cart
          set(state => ({
            cart: [
              ...state.cart,
              {
                product,
                quantity: 1,
                variant,
                giftBox: griftBox,
              },
            ],
          }))
        },
        // implement the remove from cart method that takes a product id and a variant id
        removeFromCart: (id, variantId) => {
          // filter out the product from the cart
          set(state => ({
            cart: state.cart.filter(
              item => item.product._id !== id || item.variant._id !== variantId
            ),
          }))
        },
        // implement the update quantity method that takes a product id and a variant id and a quantity
        updateQuantity: (id, variantId, quantity) => {
          // check if the product is in the cart
          const cartItem = get().cart.find(
            item => item.product._id === id && item.variant._id === variantId
          )

          // if the product is not in the cart, return
          if (!cartItem) {
            return
          }

          // update the quantity of the product in the cart
          set(state => ({
            cart: state.cart.map(item => {
              if (item.product._id === id && item.variant._id === variantId) {
                return {
                  ...item,
                  quantity,
                }
              }
              return item
            }),
          }))
        },
        // implement the clear cart method
        clearCart: () => {
          // clear the cart
          set({ cart: [] })
        },
        // implement the increment quantity method that takes a product id and a variant id
        incrementQuantity: (id, variantId) => {
          // find the item in the cart
          const cartItem = get().cart.find(
            item => item.product._id === id && item.variant._id === variantId
          )

          // if the item is not in the cart, return
          if (!cartItem) {
            return
          }

          // increment the quantity of the item in the cart
          set(state => ({
            cart: state.cart.map(item => {
              if (item.product._id === id && item.variant._id === variantId) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                }
              }
              return item
            }),
          }))
        },
        // implement the decrement quantity method that takes a product id and a variant id
        decrementQuantity: (id, variantId) => {
          // find the item in the cart
          const cartItem = get().cart.find(
            item => item.product._id === id && item.variant._id === variantId
          )

          // if the item is not in the cart, return
          if (!cartItem) {
            return
          }

          // if the item quantity is 1, remove the item from the cart
          if (cartItem.quantity === 1) {
            get().removeFromCart(id, variantId)
            return
          }

          // decrement the quantity of the item in the cart
          set(state => ({
            cart: state.cart.map(item => {
              if (item.product._id === id && item.variant._id === variantId) {
                return {
                  ...item,
                  quantity: item.quantity - 1,
                }
              }
              return item
            }),
          }))
        },
        // implement the total cart items method
        totalCartItems: () => {
          // get the total number of items in the cart
          return get().cart.reduce((acc, item) => acc + item.quantity, 0)
        },
        // implement the total cart price method
        totalCartPrice: () => {
          // get the total price of the items in the cart it should add the price of any gift box option if it exists
          return get().cart.reduce((acc, item) => {
            const price = item.variant.price * item.quantity
            const giftBoxPrice = item.giftBox?.price || 0
            return acc + price + giftBoxPrice
          }, 0)
        },
        isOpen: false,
        toggleCart: () => {
          set(state => ({isOpen: !state.isOpen}))
        }
      }),
      {
        name: 'cart',
      }
    )
  )
}


