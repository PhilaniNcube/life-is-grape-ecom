import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

const DashboardPage = async () => {




  return (
    <div className='@container'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      <Separator className='my-2' />
      <div className='@sm:grid-cols-3 @md:grid-col-4 grid grid-cols-1 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Brandy</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>There are {brandy.length} brandy product(s).</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Whiskey</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>There are {whiskey.length} whiskey product(s).</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vodka</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>There are {vodka.length} vodka product(s).</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gin</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>There are {gin.length} gin product(s).</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rum</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>There are {rum.length} rum product(s).</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tequila</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p>There are {tequila.length} tequila product(s).</p> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default DashboardPage
