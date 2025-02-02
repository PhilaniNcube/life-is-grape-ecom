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
import { startTransition, useActionState } from 'react'
import { toast } from '@/hooks/use-toast'
import { createGiftVoucher, giftVoucherPayment } from '@/actions/vouchers'
import { generateGiftVoucherCode } from '@/lib/utils'
import { CircleDashed } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'


const formSchema = z.object({
  voucherCode: z.string().min(1, 'Voucher code is required'),
  buyerEmail: z.string().email('Invalid email address'),
  recipientEmail: z.string().email('Invalid email address'),
  voucherValue: z.number().min(100, 'Minimum voucher value is 100'),
})

export function GiftVoucherForm() {

  const [state, formAction, isPending] = useActionState(createGiftVoucher, null)


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

        const actionData = await formAction(values)
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
        <div className='grid gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='voucherCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voucher Code</FormLabel>
                <div className='flex gap-x-3'>
                  <FormControl>
                    <Input
                      placeholder='Enter voucher code'
                      readOnly
                      {...field}
                    />
                  </FormControl>{' '}
                  <Button
                    onClick={handleGenerateCode}
                    type='button'
                    className='bg-slate-800 text-xs text-white'
                  >
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
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
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
        </div>

        <Button
          type='submit'
          disabled={isPending}
          className='relative bg-slate-800 text-white'
        >
          {isPending && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <CircleDashed className='animate-spin' />
            </div>
          )}
          Create Gift Voucher
        </Button>
      </form>

      {state?.success && (
        <div className='mt-8'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-slate-800 text-white'>
                Confirm Purchase
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Voucher Created</h3>
                <p>
                  Your gift voucher has been successfully created. Please proceed to make the payment to complete the purchase. You will receive an email with the voucher details.
                </p>
              </div>
              <Button onClick={() => {
                giftVoucherPayment(state.voucher_id!)
              }}>
                Proceed to Payment
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Form>
  )
}
