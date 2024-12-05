import { ReactNode } from 'react'
import Filter from '../products/_components/filter'

const CategoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='container flex flex-col md:flex-row'>
        <Filter />
      {children}
    </div>
  )
}
export default CategoryLayout
