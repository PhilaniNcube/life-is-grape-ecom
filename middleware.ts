import { clerkClient, clerkMiddleware, createRouteMatcher, currentUser } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([ '/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  
  const client = await clerkClient()
  const userData = await auth.call('currentUser')

  
  if (!userData.userId) return

  const {privateMetadata} = await client.users.getUser(userData?.userId)

  const userRole = privateMetadata?.role



  if (isProtectedRoute(req) && userRole !== 'shop-admin')  await auth.protect()

 
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
