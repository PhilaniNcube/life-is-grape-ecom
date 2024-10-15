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


type WineryTableProps = {
  suppliers: {
    _creationTime: number
    _id: string
    description: string
    image: string
    location: string
    name: string
  }[]
}

export default function WineryTable({ suppliers }: WineryTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Function to format the date
  const formatDate = (date: number) => {
    format(new Date(date * 1000), 'yyyyMMdd')
  }

  // Filter wineries based on search term
  const filteredWineries = suppliers.filter(
    winery =>
      winery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winery.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='container mx-auto py-10'>
      <h2 className='mb-4 text-2xl font-bold'>Winery List</h2>
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
              <TableHead className='w-[100px]'>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className='text-right'>Added At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWineries.map(winery => (
              <TableRow key={winery._id}>
                <TableCell>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={winery.image} alt={winery.name} />
                    <AvatarFallback>
                      {winery.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className='font-medium'>{winery.name}</TableCell>
                <TableCell>{winery.location}</TableCell>
                <TableCell className='text-right'>
                  {formatISO(winery._creationTime, { representation: 'date', format: 'extended' })}
                </TableCell>
                <TableCell className='text-right'>
                  <Link
                    href={`/dashboard/suppliers/${winery._id}`}
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
