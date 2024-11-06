'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Doc } from '@/convex/_generated/dataModel'
import { useState } from 'react'


interface ProducerTableProps {
  producers: Doc<"producers">[]
}

export default function ProducerTable({ producers }: ProducerTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredProducers = producers.filter(producer => {
    const matchesSearch = producer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || producer.type === typeFilter

    return matchesSearch && matchesType
  })

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <Input
          placeholder='Search producers...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='max-w-sm'
        />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='winery'>Winery</SelectItem>
            <SelectItem value='distillery'>Distillery</SelectItem>
            <SelectItem value='brand'>Brand</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducers.map(producer => (
            <TableRow key={producer._id}>
              <TableCell>{producer.name}</TableCell>
              <TableCell className='capitalize'>{producer.type}</TableCell>
              <TableCell>{producer.location || 'N/A'}</TableCell>
              <TableCell className='max-w-md truncate'>
                {producer.website}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
