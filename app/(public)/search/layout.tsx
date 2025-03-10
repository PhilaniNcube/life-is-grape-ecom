import { littlepot } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Search } from 'lucide-react'

const SearchPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className='container mx-auto flex items-end space-x-4 px-4 py-8'>
        <h1 className={cn('text-3xl font-semibold', littlepot.className)}>
          Search
        </h1>
        <form className='space-y-2'>
          <div className='relative'>
            <Input
              id='term'
              name='term'
              className='peer pe-9 ps-9'
              placeholder='Search...'
              type='search'
            />
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
              <Search size={16} strokeWidth={2} />
            </div>
            <button
              className='absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              aria-label='Submit search'
              type='submit'
            >
              <ArrowRight size={16} strokeWidth={2} aria-hidden='true' />
            </button>
          </div>
        </form>
      </div>
      {children}
    </div>
  )
}
export default SearchPageLayout
