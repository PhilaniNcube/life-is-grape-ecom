// page.tsx
'use client'

import React, { ReactNode, useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductList from './product-list'



// Define available product types. Modify this array based on your actual product types.
const productTypes = ['wine', 'spirit' ]

const Products = () => {
  const [selectedType, setSelectedType] = useState<string>('all')

  // Fetch products based on the selected product type using Convex's useQuery hook.
  const products = useQuery(
    api.products.getShallowProducts,
  )



  const handleFilterChange = (type: string) => {
    setSelectedType(type)
  }

  return (
    <section className='bg-gray-100 py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-8 md:flex-row'>
          {/* Filter Sidebar */}
          <div className='md:w-1/4'>
            <h3 className='mb-4 text-xl font-semibold'>
              Filter by Product Type
            </h3>
            <ul className='space-y-2'>
              {/* "All" Filter Button */}
              <li>
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`w-full rounded px-4 py-2 text-left ${
                    selectedType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-blue-100'
                  }`}
                >
                  All
                </button>
              </li>
              {/* Dynamic Filter Buttons */}
              {productTypes.map(type => (
                <li key={type}>
                  <button
                    onClick={() => handleFilterChange(type)}
                    className={`w-full rounded px-4 py-2 text-left ${
                      selectedType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-800 hover:bg-blue-100'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Grid */}
          <div className='md:w-3/4'>
            {/* Loading State */}
            {products && products.length > 0 ? (
              /* Products Grid */
              <ProductList products={products} />
            ) : (
              /* No Products Found State */
              <p className='text-gray-500'>No products found.</p>
            )}
            {/* Optional: Link to View All Products */}
            <div className='mt-8 text-center'>
              <Link href='/products'>
                <Button className='bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700'>
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
