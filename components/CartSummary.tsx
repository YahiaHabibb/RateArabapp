import { useSession } from 'next-auth/react'
import React from 'react'
import PriceFormat from './PriceFormat'
import { calculateCartTotals } from '@/lib/utils'

const CartSummary = () => {
  const { data: session  } = useSession()
  const { totalAmt } = calculateCartTotals();
  return (
    <section className='mt-16 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <div>
        <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
        <dl className='mt-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <dt className='text-sm text-gray-600'>SubTotal</dt>
            <dd className='text-sm font-medium text-gray-900'>
              <PriceFormat amount={totalAmt?.regular} 
              />
            </dd>
          </div>
          <div>
            <dt>Total Discount</dt>
          </div>
        </dl>
      </div>
      <button type='submit' className='w-full mt-6 rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200'>
          CheckOut
      </button>
    </section>
  )
}

export default CartSummary