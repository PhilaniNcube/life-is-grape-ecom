import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

const DashboardPage = async () => {
  const data = await fetchQuery(api.products.getProductCount)

  const brandyPromise = fetchQuery(api.products.getProductsByType, {
    type: 'Brandy',
  })
  const ginPromise = fetchQuery(api.products.getProductsByType, { type: 'Gin' })
  const whiskeyPromise = fetchQuery(api.products.getProductsByType, {
    type: 'Whiskey',
  })
  const vodkaPromise = fetchQuery(api.products.getProductsByType, {
    type: 'Vodka',
  })
  const rumPromise = fetchQuery(api.products.getProductsByType, { type: 'Rum' })
  const tequilaPromise = fetchQuery(api.products.getProductsByType, { type: 'Tequila' })

  const [brandy, gin, whiskey, vodka, rum, tequila] = await Promise.all([
    brandyPromise,
    ginPromise,
    whiskeyPromise,
    vodkaPromise,
    rumPromise,
    tequilaPromise
  ])

  return (
    <div className='@container'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p>There are {data} products in the database.</p>
      <Separator className='my-2' />
      <div className='@sm:grid-cols-3 @md:grid-col-4 grid grid-cols-1 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Brandy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There are {brandy.length} brandy product(s).</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Whiskey</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There are {whiskey.length} whiskey product(s).</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vodka</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There are {vodka.length} vodka product(s).</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gin</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There are {gin.length} gin product(s).</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rum</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There are {rum.length} rum product(s).</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tequila</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There are {tequila.length} tequila product(s).</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default DashboardPage
