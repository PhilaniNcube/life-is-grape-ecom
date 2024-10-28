import { getPost } from "@/sanity/queries/posts";
import { PortableText, type SanityDocument } from 'next-sanity'
import Link from "next/link";

type BlogPageProps = Promise<{ params: { slug: string } }>;

const BlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params

  const post = await getPost(slug);

  const postImageUrl = post.mainImage;

  console.log({post});

  return (
    <main className='container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8'>
      <Link href='/blog' className='hover:underline'>
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className='aspect-video rounded-xl'
          width='550'
          height='310'
        />
      )}
      <h1 className='mb-8 text-4xl font-bold'>{post.title}</h1>
      <div className='prose'>
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  )
}
export default BlogPage;
