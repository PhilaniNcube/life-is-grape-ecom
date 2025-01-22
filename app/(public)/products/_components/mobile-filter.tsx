'use client'

import { Badge } from '@/components/ui/badge'
import { Doc } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useParams, useRouter } from 'next/navigation'

const MobileFilter = ({ categories }: { categories: Doc<'categories'>[] }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const router = useRouter()
  const [isPending, startTransition ] = useTransition()

  const params = useParams()
  console.log(params)
  const { slug } = params

  return (
    <div>
      {/* createt a mobile filter */}
      <div className='flex md:hidden '>
        <div className='flex flex-1 flex-col'>
          <h2 className='text-lg font-semibold text-gray-800'>Filter</h2>
          <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-full justify-between'
              >
                {value
                  ? categories.find(category => category.slug === value)?.name
                  : 'Select filter...'}
                <ChevronsUpDown className='opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0'>
              <Command className='w-full'>
                <CommandInput
                  placeholder='Search...'
                  value={value}
                  className='h-9 w-full'
                />
                <CommandList className='w-full'>
                  <CommandEmpty>No categories found</CommandEmpty>
                  <CommandGroup title='Categories'>
                    {categories.map(category => (
                      <CommandItem
                        key={category.name}
                        value={category.slug}
                        className='w-full'
                        onSelect={currentValue => {

                          setOpen(false)
                          startTransition(() => {
                            router.push(`/categories/${category.slug}`)
                          })
                        }}
                      >
                        {category.name}
                        {category.slug === value && <Check />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>


        </div>
      </div>
    </div>
  )

  return <div>MobileFilter</div>
}
export default MobileFilter
