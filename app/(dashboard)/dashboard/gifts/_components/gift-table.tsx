import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Package, ShoppingBag, Tag, Wine } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { deleteGiftAction } from '@/actions/gifts'
import DeleteGiftDialog from './delete-gift-dialog'
import Link from 'next/link'

// Sample gift data based on the previous schema

export default async function GiftTable() {
  const gifts = await fetchQuery(api.gifts.getGifts)
  return (
    <div className='container mx-auto py-10'>
      <h1 className='mb-4 text-2xl font-bold'>Gift Products</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
           
              <TableHead>Compatible Wines</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gifts.map(gift => (
              <TableRow key={gift._id}>
                <TableCell className='font-medium'>
                  <div className='flex items-center space-x-2'>
                    <span>{gift.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {gift.type === 'box' && (
                    <Package className='mr-2 inline' size={16} />
                  )}
                  {gift.type === 'label' && (
                    <Tag className='mr-2 inline' size={16} />
                  )}
                  {gift.type === 'bag' && (
                    <ShoppingBag className='mr-2 inline' size={16} />
                  )}
                  {gift.type.charAt(0).toUpperCase() + gift.type.slice(1)}
                </TableCell>
                <TableCell>{formatPrice(gift.price)}</TableCell>
      
                <TableCell>
                  {gift.compatible_wine_types.map(type => (
                    <Badge key={type} variant='secondary' className='mr-1'>
                      <Wine className='mr-1 inline' size={12} />
                      {type}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      gift.in_stock ? 'bg-green-700' : 'bg-red-600',
                      'text-white'
                    )}
                  >
                    {gift.in_stock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link
                    className='text-slate-600'
                    href={`/dashboard/gifts/${gift._id}`}
                  >
                    <Badge className='bg-blue-800 text-white'>View</Badge>
                    
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteGiftDialog id={gift._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
