import { ReactNode } from 'react'
import Filter from '../products/_components/filter'

const CategoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='container flex flex-row'>
      <div className='w-1/4'>
        <Filter />
      </div>
      {children}
    </div>
  )
}
export default CategoryLayout
