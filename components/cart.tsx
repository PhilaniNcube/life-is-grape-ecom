'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart-store-provider'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function Cart() {
  const {
    totalCartItems,
    incrementQuantity,
    decrementQuantity,
    cart,
    totalCartPrice,
    removeFromCart,
    toggleCart,
    isOpen,
  } = useCartStore(state => state)
  const items = totalCartItems()

  const totalPrice = totalCartPrice()

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='relative'>
          <ShoppingCart className='h-4 w-4' />
          {cart.length > 0 && (
            <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
              {items}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:max-w-lg'>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className='mt-4 h-[calc(100dvh-20rem)] pb-4 pr-4'>
          {cart.map(item => (
            <div
              key={`${item.product._id}`}
              className='flex items-center justify-between border-b py-4'
            >
              <div>
                <h3 className='font-medium'>{item.product.name}</h3>
                <p className='text-sm text-gray-500'>
                  {item.product.volume && `${item.product.volume} ml - `} {formatPrice(item.product.price)}
                </p>
                {item.giftBox && (
                  <span className='text-xs text-red-700'>
                    {item.giftBox &&
                      `${item.giftBox.name} - ${formatPrice(item.giftBox.price)} x ${item.giftBox.quantity}`}
                  </span>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => decrementQuantity(item.product._id)}
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-8 text-center'>{item.quantity}</span>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => incrementQuantity(item.product._id)}
                >
                  <Plus className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-destructive'
                  onClick={() => removeFromCart(item.product._id)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className='mt-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='font-medium'>Total:</span>
            <span className='font-bold'>{formatPrice(totalPrice)}</span>
          </div>
          <Link href='/checkout'>
            <Button
              onClick={() => toggleCart()}
              className='w-full rounded-none'
            >
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
