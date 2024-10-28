import { getPosts } from "@/sanity/queries/posts";
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from 'next-sanity'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const BlogList = async () => {

  const posts = await getPosts();
  console.log({posts});


  return (
    <div className='container mx-auto py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Blog Posts</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map(post => (
          <Card key={post.slug.current} className='overflow-hidden'>
            <CardHeader className='p-0'>
              {post.mainImage && (
                <Image
                  src={post.mainImage}
                  alt={post.mainImage.alt || post.title}
                  width={400}
                  height={200}
                  className='h-48 w-full object-cover'
                />
              )}
            </CardHeader>
            <CardContent className='p-4'>
              <CardTitle className='mb-2'>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className='hover:underline'
                >
                  {post.title}
                </Link>
              </CardTitle>
              <div className='mb-2 flex items-center'>
                <Avatar className='mr-2 h-6 w-6'>
                  {/* <AvatarImage
                    src={post.author.image?.asset.url}
                    alt={post.author.name}
                  /> */}
                  {/* <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback> */}
                </Avatar>
                <span className='text-sm text-muted-foreground'>
                  {/* {post.author.name} */}
                </span>
              </div>
              <div className='mb-2 flex flex-wrap gap-2'>
                {post.categories.map((category:{title:string}) => (
                  <Badge key={category.title} variant='secondary'>
                    {category.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className='text-sm text-muted-foreground'>
              {new Date(post.publishedAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
};
export default BlogList;
