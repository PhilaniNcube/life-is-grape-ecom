'use client'

import * as React from 'react'
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
import { parseAsInteger, useQueryState } from 'nuqs'
import { useRouter, useSearchParams } from 'next/navigation'
import DeleteProductDialog from './delete-product'
import { Pencil1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { updateSortOrder } from '@/convex/products'
import { updateSortOrderAction } from '@/actions/products'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import SortDialog from './sort-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ProductSaleToggle } from './toggle-on-sale'
import { ProductPriceEdit } from './product-price-edit'

const columns: ColumnDef<Doc<'products'>>[] = [
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
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <ProductPriceEdit
        productId={row.original._id}
        initialPrice={row.original.price}
      />
    ),
  },
  {
    accessorKey: 'product_type',
    header: 'Type',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('product_type')}</div>
    ),
  },
  {
    accessorKey: 'categories',
    accessorFn: (row: any) => row.categories,
    filterFn: (row: any, columnId: string, filterValue: string) => {
      return row.getValue(columnId).includes(filterValue)
    },
    header: 'Categories',
    cell: ({ row }) => {
      const { categories } = row.original

      return (
        <div className='text-center text-xs'>
          {categories.length}
          <span className='hidden'>{categories}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'in_stock',
    header: 'In Stock',
    cell: ({ row }) => (
      <div
        className={row.getValue('in_stock') ? 'text-green-600' : 'text-red-600'}
      >
        {row.getValue('in_stock') ? 'Yes' : 'No'}
      </div>
    ),
  },
  {
    accessorKey: 'on_sale',
    header: 'On Sale',
    cell: ({ row }) => (
      <ProductSaleToggle
        productId={row.original._id}
        initialOnSale={row.original.on_sale ?? false}
      />
    ),
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => (
      <div
        className={row.getValue('featured') ? 'text-green-600' : 'text-red-600'}
      >
        {row.getValue('featured') ? 'Yes' : 'No'}
      </div>
    ),
  },
  {
    accessorKey: 'sort_order',
    header: 'Sort Order',
    cell: ({ row }) => {
      const { sort_order, _id } = row.original

      return (
        <div>
          <SortDialog id={_id} sort_order={sort_order} />
        </div>
      )
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      const router = useRouter()

      return (
        <div className='flex gap-x-5'>
          <Link href={`/dashboard/products/${product._id}`}>
            <Button type='button' variant='outline'>
              <Pencil1Icon /> Edit Product
            </Button>
          </Link>

          <DeleteProductDialog productId={product._id} />
        </div>
      )
    },
  },
]

export default function ProductTable({
  products,
  categories,
}: {
  products: Doc<'products'>[]
  categories: Doc<'categories'>[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const searchParams = useSearchParams()

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0))
  const [name, setName] = useQueryState('name')

  const table = useReactTable({
    data: products,
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
      globalFilter: name,
      rowSelection,
      pagination: {
        pageIndex: page,
        pageSize: 80,
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
            onChange={event => {
              setName(event.target.value)
              table.getColumn('name')?.setFilterValue(event.target.value)
            }}
            className='max-w-sm'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-2'>
                Filter <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-64'>
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <ScrollArea className='h-60'>
                {categories.map(category => (
                  <DropdownMenuItem
                    className='text-left'
                    key={category._id}
                    onClick={() => {
                      try {
                        const column = table.getColumn('categories')
                        console.log('column', column)
                        if (!column) {
                          console.error('Categories column not found')
                          return
                        }
                        column.setFilterValue(category._id)
                      } catch (error) {
                        console.error('Failed to set filter:', error)
                      }
                    }}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='bg-slate-300'
                onClick={() =>
                  table.getColumn('categories')?.setFilterValue('')
                }
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            onClick={() => {
              table.previousPage()
              setPage(page - 1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              ;() => table.nextPage()
              setPage(page + 1)
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
