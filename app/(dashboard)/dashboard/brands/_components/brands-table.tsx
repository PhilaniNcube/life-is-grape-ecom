'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { format, formatISO } from 'date-fns'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Ellipsis } from 'lucide-react'



export default function BrandsTable() {
  const [searchTerm, setSearchTerm] = useState('')

  const brands = useQuery(api.brands.getBrands)

  // Filter wineries based on search term
  const filteredBrands = brands?.filter(
    brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <div className='container mx-auto py-10'>
      <h2 className='mb-4 text-2xl font-bold'>Brands List</h2>
      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Search wineries...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'><Ellipsis /></TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='text-right'>Added At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands?.map(brand => (
              <TableRow key={brand._id}>
                <TableCell>
                  <Avatar className='h-9 w-9'>
                    <AvatarFallback>
                      {brand.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className='font-medium'>{brand.name}</TableCell>
                <TableCell className='text-right'>
                  {formatISO(brand._creationTime, {
                    representation: 'date',
                    format: 'extended',
                  })}
                </TableCell>
                <TableCell className='text-right'>
                  <Link
                    href={`/dashboard/brands/${brand._id}`}
                    className='text-blue-600 hover:text-blue-800 hover:underline'
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
