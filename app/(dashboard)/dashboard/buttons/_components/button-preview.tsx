'use client'

import { CustomButton } from '@/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const ButtonPreview = () => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Button Variants</CardTitle>
        <CardDescription>
          Preview of all available button styles and sizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {/* Default variant */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Default</h3>
            <div className='flex flex-wrap gap-4'>
              <CustomButton size='sm'>Small</CustomButton>
              <CustomButton size='md'>Medium</CustomButton>
              <CustomButton size='lg'>Large</CustomButton>
              <CustomButton isLoading>Loading</CustomButton>
            </div>
          </div>

          {/* Outline variant */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Outline</h3>
            <div className='flex flex-wrap gap-4'>
              <CustomButton variant='outline' size='sm'>
                Small
              </CustomButton>
              <CustomButton variant='outline' size='md'>
                Medium
              </CustomButton>
              <CustomButton variant='outline' size='lg'>
                Large
              </CustomButton>
              <CustomButton variant='outline' isLoading>
                Loading
              </CustomButton>
            </div>
          </div>

          {/* Ghost variant */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Ghost</h3>
            <div className='flex flex-wrap gap-4'>
              <CustomButton variant='ghost' size='sm'>
                Small
              </CustomButton>
              <CustomButton variant='ghost' size='md'>
                Medium
              </CustomButton>
              <CustomButton variant='ghost' size='lg'>
                Large
              </CustomButton>
              <CustomButton variant='ghost' isLoading>
                Loading
              </CustomButton>
            </div>
          </div>

          {/* With Icons */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>With Icons</h3>
            <div className='flex flex-wrap gap-4'>
              <CustomButton>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 12h14' />
                  <path d='m12 5 7 7-7 7' />
                </svg>
                Continue
              </CustomButton>
              <CustomButton variant='outline'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <polyline points='7 10 12 15 17 10' />
                  <line x1='12' x2='12' y1='15' y2='3' />
                </svg>
                Download
              </CustomButton>
              <CustomButton variant='ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10' />
                  <line x1='12' x2='12' y1='8' y2='16' />
                  <line x1='8' x2='16' y1='12' y2='12' />
                </svg>
                Add New
              </CustomButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ButtonPreview
