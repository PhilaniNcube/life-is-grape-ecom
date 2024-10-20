'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter, useSearchParams } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'

type WineType =
  | 'Sauvignon Blanc'
  | 'Chardonnay'
  | 'Merlot'
  | 'Cabernet Sauvignon'
  | 'Pinot Noir'
  | 'Pinot Grigio'
  | 'Pinotage'
  | 'Syrah'
  | 'Zinfandel'
  | 'Riesling'
  | 'Port'
  | 'Sherry'
  | 'Madeira'
  | 'Marsala'
  | 'Vermouth'
  | 'Rose'
  | 'Malbec'
  | 'Champagne'
  | 'Prosecco'
  | 'Sangiovese'
  | 'Moscato'

type WineVariety =
  | 'red'
  | 'white'
  | 'rose'
  | 'sparkling'
  | 'dessert'
  | 'fortified'

interface WineFilterProps {
  onFilterChange: (filters: {
    types: WineType[]
    varieties: WineVariety[]
    inStock: boolean | null
  }) => void
}

export default function Component({
  search_types,
}: {
  search_types?: string[]
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const searchParams = useSearchParams()
  const [optimisticSearchTypes, setOptimisticSearchTypes] =
    useOptimistic(search_types)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const wine_types = searchParams.get('search_types')

  const [inStock, setInStock] = React.useState<boolean | null>(null)

  const wineTypes: WineType[] = [
    'Sauvignon Blanc',
    'Chardonnay',
    'Merlot',
    'Cabernet Sauvignon',
    'Pinot Noir',
    'Pinot Grigio',
    'Pinotage',
    'Syrah',
    'Zinfandel',
    'Riesling',
    'Port',
    'Sherry',
    'Madeira',
    'Marsala',
    'Vermouth',
    'Rose',
    'Malbec',
    'Champagne',
    'Prosecco',
    'Sangiovese',
    'Moscato',
  ]

  const wineVarieties: WineVariety[] = [
    'red',
    'white',
    'rose',
    'sparkling',
    'dessert',
    'fortified',
  ]

  return (
    <div className='flex min-w-[200px] flex-col space-y-4'>
      <h2 className='text-lg font-semibold'>Filter</h2>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='space-y-2'>
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='flex w-full justify-between bg-slate-200 px-2 text-lg font-medium'
          >
            Wine Types
            <ChevronsUpDown className='h-4 w-4' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='space-y-2'>
          <div
            data-pending={isPending ? '' : undefined}
            className='flex flex-col space-y-2'
          >
            {wineTypes.map(type => (
              <div
                key={type}
                className='flex items-center space-x-2 rounded-md px-2 py-1 hover:bg-slate-300'
              >
                <Checkbox
                  name={type}
                  id={type}
                  checked={optimisticSearchTypes?.includes(type)}
                  onCheckedChange={e => {
                    let newSearchTypes =
                      e === true
                        ? [...optimisticSearchTypes!, type]
                        : optimisticSearchTypes?.filter(t => t !== type)

                    let newParams = new URLSearchParams(
                      newSearchTypes?.map(searchType => [
                        'search_types',
                        searchType,
                      ])
                    )

                    setIsOpen(true)

                    startTransition(() => {
                      setOptimisticSearchTypes(newSearchTypes)
                      router.push(`/wines?${newParams}`)
                    })
                  }}
                />
                <label
                  htmlFor={type}
                  className='cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
