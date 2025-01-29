import { Truck, Clock, DollarSign, Package } from 'lucide-react'
import Image from 'next/image'

export default function DeliveryInfo() {
  const deliveryInfo = [
    {
      image: '/images/delivery_truck.webp',
      description: 'Delivery in 2-3 working days',
    },
    {
      image: '/images/clock.webp',
      description: 'Transit times are 3-5 working days',
    },
    {
      image: '/images/free_delivery.webp',
      description: 'FREE delivery for orders R2000+',
    },
  ]

  return (
    <div className='bg-black text-white'>
      <div className='container mx-auto px-4 py-2 md:py-6'>
        <div className='-mx-2 flex flex-wrap items-center justify-between'>
          {deliveryInfo.map((info, index) => (
            <div
              key={index}
              className='flex w-1/2 items-center px-2 py-1 md:w-auto md:py-0'
            >
              <p className='text-xs md:text-sm'>{info.description}</p>{' '}
              <Image
                src={info.image}
                width={155}
                height={88}
                alt='Delivery'
                className='w-16 object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
