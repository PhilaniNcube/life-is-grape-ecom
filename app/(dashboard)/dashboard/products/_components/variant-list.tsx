import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Doc } from '@/convex/_generated/dataModel'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatPrice } from '@/lib/utils'
import UpdateVolumeDialog from './update-variant-volume'
import UpdatePriceDialog from './update-varaint-price'
import UpdateStockDialog from './update-variant-stock'

type VariantListProps = {
  product_id: Id<'products'>
}

const VariantList = async ({ product_id }: VariantListProps) => {
  const variants = await fetchQuery(api.products.getProductVariants, {
    product_id,
  })

  console.log(variants)

  return (
    <ScrollArea className='mt-2 h-[250px]'>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Volume
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Price
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                Stock
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {variants.map(variant => (
              <tr key={variant._id}>
                <td className='whitespace-nowrap px-6 py-4'>
                  <UpdateVolumeDialog
                    variantId={variant._id}
                    initialVolume={variant.volume}
                  />
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <UpdatePriceDialog
                    variantId={variant._id}
                    initialPrice={variant.price}
                  />
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                 <UpdateStockDialog
                    variantId={variant._id}
                    stock_level={variant.stock_level}
                  />
                </td>
              </tr>
            ))}
            {variants.length === 0 && (
              <tr>
                <td colSpan={4} className='px-6 py-4 text-center text-gray-500'>
                  No variants available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  )
}

export default VariantList
