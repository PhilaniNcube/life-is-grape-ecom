import Image from 'next/image'

interface WineImageProps {
  type: 'red' | 'white'
}

export function WineImage({ type }: WineImageProps) {
  const imageSrc =
    type === 'red'
      ? 'https://fabulous-peacock-233.convex.cloud/api/storage/51584ccf-995a-474a-b526-406033bfe5fe'
      : 'https://fabulous-peacock-233.convex.cloud/api/storage/a6af796d-04cd-4d71-bab8-4a82e7015aad'

  return (
    <div className='relative h-full w-full'>
      <Image
        src={imageSrc || '/placeholder.svg'}
        alt={`${type} wine bottle`}
        width={400}
        height={600}
        className='rounded-lg w-2/3 lg:w-3/5 mx-auto aspect-auto object-cover'
      />
    </div>
  )
}
