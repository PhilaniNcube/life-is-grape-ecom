import { Truck, Clock, DollarSign, Package } from 'lucide-react'

export default function DeliveryInfo() {
  const deliveryInfo = [
    {
      icon: <Truck className='h-4 w-4 md:h-5 md:w-5' />,
      description: 'Delivery in 2-3 working days',
    },
    {
      icon: <Clock className='h-4 w-4 md:h-5 md:w-5' />,
      description: 'Transit times are 3-5 working days',
    },
    {
      icon: <Package className='h-4 w-4 md:h-5 md:w-5' />,
      description: 'FREE delivery for orders R1500+',
    },
  ]

  return (
    <div className='bg-secondary'>
      <div className='container mx-auto px-4 py-2 md:py-6'>
        <div className='-mx-2 flex flex-wrap items-center justify-between'>
          {deliveryInfo.map((info, index) => (
            <div
              key={index}
              className='flex w-1/2 items-center px-2 py-1 md:w-auto md:py-0'
            >
              <div className='mr-2 text-primary'>{info.icon}</div>
              <p className='text-xs text-secondary-foreground md:text-sm'>
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
