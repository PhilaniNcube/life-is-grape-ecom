import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/convex/_generated/api'
import { formatPrice } from '@/lib/utils'
import { fetchQuery } from 'convex/nextjs'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'

const ExpreiencesList = async () => {
  const experiences = await fetchQuery(
    api.tasting_experiences.getTastingExperiences
  )

  return (
    <Card className='max-w-4xl mt-8'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servings</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>
              <Ellipsis className='h-6 w-6' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map(experience => {
            return (
              <TableRow key={experience._id}>
                <TableCell>{experience.servings}</TableCell>
                <TableCell>{formatPrice(experience.price)}</TableCell>
                <TableCell>
                  <p>{experience.name}</p>
                  <p className='text-xs text-slate-500'>
                    {experience.description}
                  </p>
                </TableCell>
                <TableCell>{experience.duration}</TableCell>
                <TableCell>
                  <Link className="text-slate-600" href={`/dashboard/tasting-experiences/${experience._id}`}>
                   View
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
export default ExpreiencesList
