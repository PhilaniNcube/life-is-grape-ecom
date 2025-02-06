import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store-provider'
import { useQuery } from 'convex/react'

import { useState } from 'react'

const CustomLabelPopup = () => {
  const { cart, addToCart, addCartQuantity } = useCartStore(state => state)

  // get the unlabelled products
  const housewines = useQuery(api.products.getUnlabelledProducts)

  if (!housewines) {
    return null
  }

  // check if there is a custom label in the cart
  const customLabelItem = cart.find(
    item => item.product.product_type === 'custom_label'
  )

  let customLableQuantity

  if (customLabelItem) {
    customLableQuantity = customLabelItem.quantity
  }



  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
         <Button>
          Select A House Wine
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className='grid grid-cols-2 gap-4'>
          {housewines.map(housewine => (
            <div
              key={housewine._id}
              title={housewine.name}
              className='p-4'


            >
              <div className='flex flex-col gap-4'>
                <img
                  src={housewine.main_image}
                  alt={housewine.name}
                  className='w-full h-48 object-cover'
                />
                <div className='flex flex-col gap-4'>
                  <p>{housewine.name}</p>
                  <p>{formatPrice(housewine.price)}</p>
                </div>
                <Button onClick={() => {
                  addCartQuantity(housewine, 6)
                }}>
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      <AlertDialogCancel className='bg-red-700 text-white'>Close</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default CustomLabelPopup
