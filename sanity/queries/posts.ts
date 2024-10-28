import { type SanityDocument } from 'next-sanity'
import { client } from '../lib/client'



export async function getPosts() {

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt,  "mainImage": mainImage.asset->url,"categories":categories[]->{title},}`

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {})

  return posts

}


export async function getPost(slug: string) {
  const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    body,
    "author": author->name,
    "mainImage": mainImage.asset->url,
    "categories":categories[]->{title},
  }`

  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug })

  return post
}
