'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
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
import { useTransition } from 'react'
import { toast } from '@/hooks/use-toast'
import { purchaseGiftVoucher } from '@/actions/vouchers'
import { generateGiftVoucherCode } from '@/lib/utils'


const formSchema = z.object({
  voucherCode: z.string().min(1, 'Voucher code is required'),
  buyerEmail: z.string().email('Invalid email address'),
  recipientEmail: z.string().email('Invalid email address'),
  voucherValue: z.number().min(100, 'Minimum voucher value is 100'),
})

export function GiftVoucherForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherCode: '',
      buyerEmail: '',
      recipientEmail: '',
      voucherValue: 100,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await purchaseGiftVoucher(values)
        toast({
          title: 'Success',
          description: 'Gift voucher purchased successfully!',
        })
        form.reset()
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to purchase gift voucher. Please try again.',
          variant: 'destructive',
        })
      }
    })
  }

  function handleGenerateCode() {

    const code = generateGiftVoucherCode()

    form.setValue('voucherCode', code)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='voucherCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher Code</FormLabel>
              <div className='flex gap-x-3'>
                <FormControl>
                  <Input placeholder='Enter voucher code' readOnly {...field} />
                </FormControl>{' '}
                <Button onClick={handleGenerateCode} type='button'>
                  Generate Code
                </Button>
              </div>

              <FormDescription>
                Generate a unique code for this voucher.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='buyerEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='your@email.com' {...field} />
              </FormControl>
              <FormDescription>
                Enter your email address as the buyer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recipientEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient's Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='recipient@email.com'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the email address of the person receiving the voucher.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='voucherValue'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher Value</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={100}
                  {...field}
                  onChange={e =>
                    field.onChange(Number.parseInt(e.target.value, 10))
                  }
                />
              </FormControl>
              <FormDescription>
                Enter the value of the voucher (minimum 100).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Purchasing...' : 'Purchase Voucher'}
        </Button>
      </form>
    </Form>
  )
}
