import { Card, CardTitle } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import Link from 'next/link'

const Brands = async () => {
  const producers = await fetchQuery(api.producers.getProducers)

  return (
    <div className='container my-12 @container'>
      <h1 className='text-center text-3xl font-bold'>Our Partners</h1>
      <div className='mt-8 grid grid-cols-2 gap-4'>
        {producers.map(producer => {
          return (
            <Link
              href={`/brands/${producer._id}`}
              key={producer._id}
              className='rounded-lg bg-white shadow-md'
            >
              <Card className='p-4'>
                <CardTitle className='text-xl font-bold'>
                  {producer.name}
                </CardTitle>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
export default Brands
