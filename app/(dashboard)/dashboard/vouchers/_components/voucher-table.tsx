"use client";


import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { formatPrice } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pencil1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { updateSortOrder } from '@/convex/products'
import { updateSortOrderAction } from '@/actions/products'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { ScrollArea } from '@/components/ui/scroll-area'

const columns: ColumnDef<Doc<'gift_vouchers'>>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
        accessorKey: 'code',
        header: 'Code',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('code')}</div>,
        enableSorting: true,
        enableHiding: false
    },
    {
        accessorKey: 'purchaser_email',
        header: 'Purchaser Email',
        cell: ({ row }) => <div className='lowercase'>{row.getValue('purchaser_email')}</div>,
        enableSorting: true,
    },
    {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => <div>{formatPrice(row.getValue('value'))}</div>,
    },
    {
        accessorKey: 'paid',
        header: 'Paid',
        cell: ({ row }) => <div>{row.getValue('paid') ? 'Yes' : 'No'}</div>,
    },
    {
        accessorKey: 'redeemed',
        header: 'Redeemed',
        cell: ({ row }) => <div>{row.getValue('redeemed') ? 'Yes' : 'No'}</div>,
    },
  
   
  
   
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="outline" size="sm">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => {
                            console.log('Edit', row.original)
                        }}
                    >
                        <Pencil1Icon />
                        <span>Edit</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]

import React from 'react'

const VoucherTable = ({vouchers}:{vouchers:Doc<'gift_vouchers'>[]}) => {
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
     []
   )
   const [columnVisibility, setColumnVisibility] =
     React.useState<VisibilityState>({})
   const [rowSelection, setRowSelection] = React.useState({})
 
   const searchParams = useSearchParams()
 
   const page = searchParams.get('page') ?? '1'
   const nameFilter = searchParams.get('name') ?? ''
 
   const table = useReactTable({
     data: vouchers,
     columns,
     onSortingChange: setSorting,
     onColumnFiltersChange: setColumnFilters,
     getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
     getSortedRowModel: getSortedRowModel(),
     getFilteredRowModel: getFilteredRowModel(),
     onColumnVisibilityChange: setColumnVisibility,
     onRowSelectionChange: setRowSelection,
     state: {
       sorting,
       columnFilters,
       columnVisibility,
       globalFilter: nameFilter,
       rowSelection,
       pagination: {
         pageIndex: 0,
         pageSize: 100,
       },
     },
   })
 
   return (
     <div className='w-full'>
       <div className='flex items-center py-4'>
         <div className='flex items-center gap-x-3'>
           <Input
             placeholder='Filter products...'
             value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
             onChange={event =>
               table.getColumn('name')?.setFilterValue(event.target.value)
             }
             className='max-w-sm'
           />
      
         </div>
 
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant='outline' className='ml-auto'>
               Columns <ChevronDown className='ml-2 h-4 w-4' />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align='end'>
             {table
               .getAllColumns()
               .filter(column => column.getCanHide())
               .map(column => {
                 return (
                   <DropdownMenuCheckboxItem
                     key={column.id}
                     className='capitalize'
                     checked={column.getIsVisible()}
                     onCheckedChange={value => column.toggleVisibility(!!value)}
                   >
                     {column.id}
                   </DropdownMenuCheckboxItem>
                 )
               })}
           </DropdownMenuContent>
         </DropdownMenu>
       </div>
       <div className='rounded-md border'>
         <Table>
           <TableHeader>
             {table.getHeaderGroups().map(headerGroup => (
               <TableRow key={headerGroup.id}>
                 {headerGroup.headers.map(header => {
                   return (
                     <TableHead key={header.id}>
                       {header.isPlaceholder
                         ? null
                         : flexRender(
                             header.column.columnDef.header,
                             header.getContext()
                           )}
                     </TableHead>
                   )
                 })}
               </TableRow>
             ))}
           </TableHeader>
           <TableBody>
             {table.getRowModel().rows?.length ? (
               table.getRowModel().rows.map(row => (
                 <TableRow
                   key={row.id}
                   data-state={row.getIsSelected() && 'selected'}
                 >
                   {row.getVisibleCells().map(cell => (
                     <TableCell key={cell.id}>
                       {flexRender(
                         cell.column.columnDef.cell,
                         cell.getContext()
                       )}
                     </TableCell>
                   ))}
                 </TableRow>
               ))
             ) : (
               <TableRow>
                 <TableCell
                   colSpan={columns.length}
                   className='h-24 text-center'
                 >
                   No results.
                 </TableCell>
               </TableRow>
             )}
           </TableBody>
         </Table>
       </div>
       <div className='flex items-center justify-end space-x-2 py-4'>
         <div className='flex-1 text-sm text-muted-foreground'>
           {table.getFilteredSelectedRowModel().rows.length} of{' '}
           {table.getFilteredRowModel().rows.length} row(s) selected.
 
         </div>
         <div className='space-x-2'>
           <Button
             variant='outline'
             size='sm'
             onClick={() => table.previousPage()}
             disabled={!table.getCanPreviousPage()}
           >
             Previous
           </Button>
           <Button
             variant='outline'
             size='sm'
             onClick={() => table.nextPage()}
             disabled={!table.getCanNextPage()}
           >
             Next
           </Button>
         </div>
       </div>
     </div>
   )
}

export default VoucherTable