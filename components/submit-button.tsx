import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { CircleDashed } from 'lucide-react'

const SubmitButton = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      type='submit'
      className={cn(className, 'w-full rounded-none')}
    >
      {pending ? (
        <div>
          <CircleDashed className='animate-spin' />
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
export default SubmitButton
