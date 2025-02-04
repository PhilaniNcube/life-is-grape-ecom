'use client'

import {
  useState,
  useRef,
  useEffect,
  useActionState,
  startTransition,
} from 'react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { updatePriceAction } from '@/actions/products'
import { CircleDashed } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

interface ProductPriceEditProps {
  productId: Id<'products'>
  initialPrice: number
}

export function ProductPriceEdit({
  productId,
  initialPrice,
}: ProductPriceEditProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const [state, formAction, isPending] = useActionState(updatePriceAction, null)

  const router = useRouter()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='' variant='outline' size='sm'>
          {formatPrice(initialPrice)}
        </Button>
      </DialogTrigger>
      <DialogContent className='py-10'>
        <DialogTitle>Update Price</DialogTitle>
        <form
          action={(formData: FormData) => {
            startTransition(async () => {
              await formAction(formData)
            })
            router.refresh()
          }}
          className='flex gap-x-3'
        >
          <Input type='hidden' name='id' value={productId} />
          <Input
            type='number'
            name='price'
            defaultValue={initialPrice}
            disabled={isPending}
            step={0.01}
            className={cn('flex-1', isPending && 'animate-pulse opacity-50')}
          />
          <Button type='submit' className='relative' disabled={isPending}>
            {isPending && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/70'>
                <CircleDashed className='animate-spin' size='sm' />
              </div>
            )}
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
