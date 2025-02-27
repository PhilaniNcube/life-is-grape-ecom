import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { fetchMutation } from 'convex/nextjs'
import { revalidatePath } from 'next/cache'

export async function updateButtons(
  id: Id<'buttons'>,
  bg: string,
  color: string,
  radius: number
) {
  await fetchMutation(api.buttons.updateButton, {
    id,
    bg,
    color,
    radius,
  })

  revalidatePath('/', 'layout')
}
