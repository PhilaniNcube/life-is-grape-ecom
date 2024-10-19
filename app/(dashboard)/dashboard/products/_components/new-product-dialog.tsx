'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { PlusIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CreateWineSchema } from '@/lib/schemas'
import SubmitButton from '@/components/submit-button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type ProductFormValues = z.infer<typeof CreateWineSchema>

const NewProductDialog = () => {
  const brands = useQuery(api.brands.getBrands)
  const wineries = useQuery(api.wineries.getWineries)

  const varieties = [
    'red',
    'white',
    'rose',
    'sparkling',
    'dessert',
    'fortified',
  ]

  const types = [
    'Chardonnay',
    'Merlot',
    'Cabernet Sauvignon',
    'Pinot Noir',
    'Pinot Grigio',
    'Syrah',
    'Zinfandel',
    'Riesling',
    'Port',
    'Sherry',
    'Madeira',
    'Marsala',
    'Vermouth',
  ]

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(CreateWineSchema),
    defaultValues: {
      brand: '',
      name: '',
      winery_id: '',
      description: '',
      year: new Date().getFullYear(),
      price: 0,
      main_image: '',
      images: [],
      in_stock: true,
      alcohol_content: 0,
      serving_suggestion: '',
      variety: '',
      type: '',
    },
    mode: 'onBlur',
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className='mr-2' />
          New Product
        </Button>
      </DialogTrigger>
      <DialogContent className='mx-auto max-h-[700px]'>
        <h2 className='text-xl font-semibold'>New Product</h2>

        <Form {...form}>
          <form className='h-full space-y-8'>
            <ScrollArea className='h-[400px] px-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mt-2 grid grid-cols-2 gap-x-3'>
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          onChange={e =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.01'
                          {...field}
                          onChange={e =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mt-2 grid grid-cols-2 gap-x-3'>
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a brand' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands?.map(brand => (
                            <SelectItem key={brand._id} value={brand._id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='winery_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Winery</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a winery' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wineries?.map(winery => (
                            <SelectItem key={winery._id} value={winery._id}>
                              {winery.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter product description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='main_image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter main image URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='in_stock'
                render={({ field }) => (
                  <FormItem className='mt-2 flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>In Stock</FormLabel>
                      <FormDescription>
                        Is this product currently in stock?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='alcohol_content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcohol Content (%)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.1'
                        max={90}
                        min={0}
                        {...field}
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='serving_suggestion'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serving Suggestion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter serving suggestion'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mt-2 grid grid-cols-2 gap-x-3'>
                <FormField
                  control={form.control}
                  name='variety'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Variety</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a variety' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {varieties.map(variety => (
                            <SelectItem key={variety} value={variety}>
                              {variety}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {types.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <SubmitButton className='mt-3'>Submit</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default NewProductDialog
