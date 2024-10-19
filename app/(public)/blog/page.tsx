import { createClient } from '@prismicio/client'
import BlogList from './_components/blog-list'

const prismicClient = createClient('life-is-grape')

const BlogPage = async () => {

  const blogList = await prismicClient.getAllByType('blog')

  console.log(blogList)

  return (
    <div>
      <BlogList blogList={blogList} />
    </div>
  )
}
export default BlogPage
