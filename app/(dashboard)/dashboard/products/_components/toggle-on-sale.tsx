'use client'

import { startTransition, useActionState, useOptimistic, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { toggleOnSale } from '@/convex/products'
import { toggleOnSaleAction } from '@/actions/products'
import { Id } from '@/convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface ProductSaleToggleProps {
  productId: Id<'products'>
  initialOnSale: boolean
}

export function ProductSaleToggle({
  productId,
  initialOnSale,
}: ProductSaleToggleProps) {
  const { toast } = useToast()

  const [state, formAction, isPending] = useActionState(
    toggleOnSaleAction,
    null
  )

  const router = useRouter()

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        await formAction(productId)
        toast({
          title: 'Product updated',
        })
      } catch (error) {
        // Revert optimistic update on error

        toast({
          title: 'Error',
          description: 'Failed to update product sale status.',
          variant: 'destructive',
        })
      } finally {
        router.refresh()
      }
    })
  }

  return (
    <Switch
      className={cn('h-4 w-8', isPending && 'opacity-50 animate-pulse')}
      defaultChecked={initialOnSale}
      onCheckedChange={handleToggle}
      disabled={isPending}
      aria-label={`Toggle sale status for product ${productId}`}
    />
  )
}
