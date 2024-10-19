import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { AllDocumentTypes } from '@/prismicio-types'
import Image from 'next/image'

// This type definition would typically be in a separate file
type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
}

// This function would typically be in a separate file and actually fetch data
async function getPosts(): Promise<Post[]> {
  // Simulating fetching posts
  return [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      date: '2023-01-01',
      excerpt: 'This is my first blog post. Welcome to my blog!',
    },
    {
      slug: 'nextjs-13-features',
      title: 'Exciting New Features in Next.js 13',
      date: '2023-02-15',
      excerpt:
        "Let's explore the game-changing features introduced in Next.js 13.",
    },
    {
      slug: 'tailwind-css-tips',
      title: 'Top 5 Tailwind CSS Tips for Rapid UI Development',
      date: '2023-03-22',
      excerpt:
        'Boost your productivity with these Tailwind CSS tips and tricks.',
    },
  ]
}

export default async function BlogList({ blogList }: { blogList: AllDocumentTypes[] }) {


  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Blog Posts</h1>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {blogList.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.uid}`}
            className='block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-xl'
          >
            <article className=''>
              <div className='relative h-48 w-full'>
                <Image
                  src={post.data.meta_image.url!}
                  alt={`Cover image for`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <div className='p-6'>
                <h2 className='mb-2 text-xl font-semibold'>
                  {post.data.meta_title}
                </h2>
                <time className='mb-3 block text-sm text-gray-500'>
                  {formatDate(post.last_publication_date)}
                </time>
                <p className='text-gray-600 mb-4'>{post.data.meta_description}</p>
                <div className='flex flex-wrap gap-2'>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className='rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
