import { Suspense } from 'react'
import BlogList from './_components/blog-list'

const BlogPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="container">
        <h1 className="text-3xl font-bold">Loading...</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden">
            <div className="p-0"></div>
            <div className="p-4">
              <div className="mb-2">
                <div className="mr-2 h-6 w-6"></div>
                <span className="text-sm text-muted-foreground"></span>
              </div>
              <div className="mb-2 flex flex-wrap gap-2"></div>
            </div>
          </div>
        </div>
      </div>}>
        <BlogList />
      </Suspense>
    </div>
  )
}
export default BlogPage
