import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Doc } from '@/convex/_generated/dataModel'
import { Id } from '@/convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatPrice } from '@/lib/utils'
import UpdateAttribute from './update-attribute'
import { Separator } from '@/components/ui/separator'

type AttributeListProps = {
  product_id: Id<'products'>
  attributes: Doc<'product_attributes'>[]
}

const AttributeList = async ({ product_id, attributes }: AttributeListProps) => {


  return (
    <ul className='space-y-4 p-3 rounded mt-4 bg-white'>
      {attributes.map(attr => (
        <li key={attr._id} className='border-b pb-2'>
          <div className='flex flex-col space-y-3 text-xs text-slate-600'>
            {/* <span className='font-semibold capitalize'>{attr.type}</span> */}
            <span className='flex flex-row gap-x-2'>
              <strong className='w-fit flex-1 text-black'>
                Alcohol Content:
              </strong>{' '}
              {attr.alcohol_content}%
            </span>
            <span className='flex flex-row gap-x-2'>
              <strong className='w-fit flex-1 text-black'>Region:</strong>{' '}
              {attr.region}
            </span>
            <span className='flex flex-row gap-x-2'>
              <strong className='w-fit flex-1 text-black'>Vintage:</strong>{' '}
              {attr.vintage || '-'}
            </span>
            <span className='flex flex-row gap-x-2'>
              <strong className='w-fit flex-1 text-black'>Variety:</strong>{' '}
              {attr.variety || '-'}
            </span>
            <span className='flex flex-row gap-x-2'>
              <strong className='w-fit flex-1 text-black'>Aging:</strong>{' '}
              {attr.aging || '-'}
            </span>
            <span className='flex flex-row gap-x-2'>
              <strong className='w-fit flex-1 text-black'>
                Distillation Method:
              </strong>{' '}
              {attr.distillation_method || '-'}
            </span>

            <span className='flex flex-row gap-x-2'>
              <strong className='w-[100px] flex-1 text-black'>
                Tasting Notes:
              </strong>{' '}
              {attr.tasting_notes || '-'}
            </span>
          </div>
          <Separator className="my-2" />
          <UpdateAttribute attributes={attr} />
        </li>
      ))}
    </ul>
  )
}

export default AttributeList
