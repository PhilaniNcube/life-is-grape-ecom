import { Id, Doc } from '@/convex/_generated/dataModel'
import { UpdateProducerSchema, UpdateProductVariantSchema } from '@/lib/schemas'
import { z } from 'zod'
import { create, createStore } from 'zustand'
import { persist } from 'zustand/middleware'



export type GiftBox = {
  name: string
  price: number
  description: string
  dimensions: string
  quantity: number
}

type ProductWithImage = Omit<Doc<'products'>, 'main_image'> & {
  main_image: string
}

// create an interface of the cart item that constains the product and the quantity of that product in the cart and the the product variant the cart item should also contain a gift box option that is potentially undefined
export interface CartItem {
  product: ProductWithImage
  quantity: number
  giftBox: GiftBox | undefined
}

export type CartState = {
  cart: CartItem[]
}

export type CartStore = {
  cart: CartItem[]
  // add a product to the cart
  addToCart: (
    product: ProductWithImage,

    giftBox?: GiftBox
  ) => void
  // remove a product from the cart by id and variant id
  removeFromCart: (
    id: Id<'products'>,

  ) => void
  // update the quantity of a product in the cart by id and variant id
  updateQuantity: (
    id: Id<'products'>,

    quantity: number
  ) => void
  // clear the cart
  clearCart: () => void
  incrementQuantity: (
    id: Id<'products'>,

  ) => void
  decrementQuantity: (
    id: Id<'products'>,

  ) => void
  // get the total number of items in the cart
  totalCartItems: () => number
  // get the total price of the items in the cart
  totalCartPrice: () => number
  isOpen: boolean
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const createCartStore = (initState: CartState = { cart: [] }) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        // cart: [],
        ...initState,
        // implement the add to cart method that takes a product and a variant and an optional gift box
        addToCart: (product,  giftBox) => {
          // check if the product is already in the cart
          const cartItem = get().cart.find(
            item =>
              item.product._id === product._id
          )

          // if the product is already in the cart, increment the quantity
          if (cartItem) {
            get().incrementQuantity(product._id)
            set({ isOpen: true })
            return
          }

          // if the product is not in the cart, add the product to the cart
          set(state => ({
            cart: [
              ...state.cart,
              {
                product,
                quantity: product.product_type === 'custom_label' ? 6 : 1,

                giftBox: giftBox
                  ? {
                      ...giftBox,
                      quantity: giftBox?.name === 'Custom wine label' ? 6 : 1,
                    }
                  : undefined,
              },
            ],
            isOpen: true,
          }))
        },
        // implement the remove from cart method that takes a product id and a variant id
        removeFromCart: (id) => {
          // filter out the product from the cart
          set(state => ({
            cart: state.cart.filter(
              item => item.product._id !== id
            ),
          }))
        },
        // implement the update quantity method that takes a product id and a variant id and a quantity
        updateQuantity: (id,  quantity) => {
          // check if the product is in the cart
          const cartItem = get().cart.find(
            item => item.product._id === id
          )

          // if the product is not in the cart, return
          if (!cartItem) {
            return
          }

          // update the quantity of the product in the cart
          set(state => ({
            cart: state.cart.map(item => {
              if (item.product._id === id ) {
                return {
                  ...item,
                  quantity,
                  giftBox: item.giftBox
                    ? { ...item.giftBox, quantity }
                    : undefined,
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
        incrementQuantity: (id) => {
          // find the item in the cart
          const cartItem = get().cart.find(
            item => item.product._id === id
          )

          // if the item is not in the cart, return
          if (!cartItem) {
            return
          }

          // increment the quantity of the item in the cart
          set(state => ({
            cart: state.cart.map(item => {
              if (item.product._id === id) {
                return {
                  ...item,
                  quantity:
                    item.product.product_type === 'custom_label'
                      ? item.quantity + 6
                      : item.quantity + 1,
                  giftBox: item.giftBox
                    ? {
                        ...item.giftBox,
                        quantity:
                          item.giftBox.name === 'Custom wine label' &&
                          item.giftBox.quantity > item.quantity
                            ? item.giftBox.quantity
                            : item.giftBox.quantity + 1,
                      }
                    : undefined,
                }
              }
              return item
            }),
          }))
        },
        // implement the decrement quantity method that takes a product id and a variant id
        decrementQuantity: (id) => {
          // find the item in the cart
          const cartItem = get().cart.find(
            item => item.product._id === id
          )

          // if the item is not in the cart, return
          if (!cartItem) {
            return
          }

          // if the item quantity is 1, remove the item from the cart
          if (cartItem.quantity === 1 ) {
            get().removeFromCart(id)
            return
          }


          if(cartItem.product.product_type === 'custom_label' && cartItem.quantity <= 6) {
            get().removeFromCart(id)
            return
          }

          // decrement the quantity of the item in the cart
          set(state => ({
            cart: state.cart.map(item => {
              if (item.product._id === id ) {
                return {
                  ...item,
                  quantity:
                    item.product.product_type === 'custom_label'
                      ? item.quantity - 6
                      : item.quantity - 1,
                  giftBox: item.giftBox
                    ? {
                        ...item.giftBox,
                        quantity:
                          item.giftBox.name === 'Custom wine label' &&
                          item.quantity <= 6
                            ? 6
                            : item.giftBox.quantity - 1,
                      }
                    : undefined,
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
            const price = item.product.price * item.quantity
            const giftBoxPrice = item.giftBox
              ? item.giftBox?.price * item.giftBox?.quantity
              : 0
            return acc + price + giftBoxPrice
          }, 0)
        },
        isOpen: false,
        toggleCart: () => {
          set(state => ({ isOpen: !state.isOpen }))
        },
        openCart: () => {
          set({ isOpen: true })
        },
        closeCart: () => {
          set({ isOpen: false })
        },
      }),
      {
        name: 'cart',
      }
    )
  )
}
