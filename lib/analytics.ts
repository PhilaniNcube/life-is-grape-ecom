import { sendGTMEvent } from '@next/third-parties/google'

/**
 * Track when a user views a product
 */
export function trackViewItem(product: {
  id: string
  name: string
  price: number
  category?: string
  brand?: string
  variant?: string
  quantity?: number
}) {
  sendGTMEvent({
    event: 'view_item',
    ecommerce: {
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || '',
          item_brand: product.brand || '',
          item_variant: product.variant || '',
          quantity: product.quantity || 1,
        },
      ],
    },
  })
}

/**
 * Track when a user views a collection of products
 */
export function trackViewItemList(
  items: Array<{
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
    position?: number
  }>,
  listName: string
) {
  sendGTMEvent({
    event: 'view_item_list',
    ecommerce: {
      item_list_name: listName,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        index: item.position || index + 1,
      })),
    },
  })
}

/**
 * Track when a user clicks on a product in a list
 */
export function trackSelectItem(
  product: {
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
  },
  listName: string,
  position: number
) {
  sendGTMEvent({
    event: 'select_item',
    ecommerce: {
      item_list_name: listName,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || '',
          item_brand: product.brand || '',
          item_variant: product.variant || '',
          index: position,
        },
      ],
    },
  })
}

/**
 * Track when a user adds a product to their cart
 */
export function trackAddToCart(product: {
  id: string
  name: string
  price: number
  category?: string
  brand?: string
  variant?: string
  quantity: number
}) {
  sendGTMEvent({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'ZAR',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || '',
          item_brand: product.brand || '',
          item_variant: product.variant || '',
          quantity: product.quantity,
        },
      ],
    },
  })
}

/**
 * Track when a user removes a product from their cart
 */
export function trackRemoveFromCart(product: {
  id: string
  name: string
  price: number
  category?: string
  brand?: string
  variant?: string
  quantity: number
}) {
  sendGTMEvent({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'ZAR',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: product.category || '',
          item_brand: product.brand || '',
          item_variant: product.variant || '',
          quantity: product.quantity,
        },
      ],
    },
  })
}

/**
 * Track when a user views their cart
 */
export function trackViewCart(
  items: Array<{
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
    quantity: number
  }>,
  value: number
) {
  sendGTMEvent({
    event: 'view_cart',
    ecommerce: {
      currency: 'ZAR',
      value,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        quantity: item.quantity,
      })),
    },
  })
}

/**
 * Track when a user begins the checkout process
 */
export function trackBeginCheckout(
  items: Array<{
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
    quantity: number
  }>,
  value: number
) {
  sendGTMEvent({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'ZAR',
      value,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        quantity: item.quantity,
      })),
    },
  })
}

/**
 * Track when a user provides shipping information
 */
export function trackAddShippingInfo(
  items: Array<{
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
    quantity: number
  }>,
  value: number,
  shippingTier: string
) {
  sendGTMEvent({
    event: 'add_shipping_info',
    ecommerce: {
      currency: 'ZAR',
      value,
      shipping_tier: shippingTier,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        quantity: item.quantity,
      })),
    },
  })
}

/**
 * Track when a user provides payment information
 */
export function trackAddPaymentInfo(
  items: Array<{
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
    quantity: number
  }>,
  value: number,
  paymentType: string
) {
  sendGTMEvent({
    event: 'add_payment_info',
    ecommerce: {
      currency: 'ZAR',
      value,
      payment_type: paymentType,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        quantity: item.quantity,
      })),
    },
  })
}

/**
 * Track when a user completes a purchase
 */
export function trackPurchase(
  items: Array<{
    id: string
    name: string
    price: number
    category?: string
    brand?: string
    variant?: string
    quantity: number
  }>,
  transaction: {
    id: string
    affiliation?: string
    revenue: number
    tax?: number
    shipping?: number
    coupon?: string
  }
) {
  sendGTMEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: transaction.id,
      affiliation: transaction.affiliation || 'Life is Grape',
      value: transaction.revenue,
      tax: transaction.tax || 0,
      shipping: transaction.shipping || 0,
      currency: 'ZAR',
      coupon: transaction.coupon || '',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || '',
        item_brand: item.brand || '',
        item_variant: item.variant || '',
        quantity: item.quantity,
      })),
    },
  })
}

/**
 * Track when a user views a promotion
 */
export function trackViewPromotion(
  promotions: Array<{
    id: string
    name: string
    creative?: string
    position?: string
  }>
) {
  sendGTMEvent({
    event: 'view_promotion',
    ecommerce: {
      items: promotions.map(promo => ({
        promotion_id: promo.id,
        promotion_name: promo.name,
        creative_name: promo.creative || '',
        creative_slot: promo.position || '',
      })),
    },
  })
}

/**
 * Track when a user clicks on a promotion
 */
export function trackSelectPromotion(promotion: {
  id: string
  name: string
  creative?: string
  position?: string
}) {
  sendGTMEvent({
    event: 'select_promotion',
    ecommerce: {
      items: [
        {
          promotion_id: promotion.id,
          promotion_name: promotion.name,
          creative_name: promotion.creative || '',
          creative_slot: promotion.position || '',
        },
      ],
    },
  })
}

/**
 * Track when a user refunds a purchase
 */
export function trackRefund(
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>,
  transaction: {
    id: string
    value: number
    isPartial?: boolean
  }
) {
  sendGTMEvent({
    event: transaction.isPartial ? 'partial_refund' : 'refund',
    ecommerce: {
      transaction_id: transaction.id,
      value: transaction.value,
      currency: 'ZAR',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    },
  })
}
