import Link from 'next/link'

export default function TermsAndConditions() {
  return (
    <div className='min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-md'>
        <div className='px-4 py-5 sm:p-6'>
          <h1 className='mb-6 text-3xl font-bold text-gray-900'>
            Terms and Conditions
          </h1>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
              Conditions of Sales
            </h2>
            <ul className='space-y-2 text-gray-600 list-disc list-inside'>
              <li>
                Drinking alcohol under 18 years of age is prohibited by law.
              </li>
              <li>Drinking and driving is prohibited by law.</li>
              <li>
                Drinking alcohol during pregnancy or lactation may adversely
                affect the development of the foetus or infant.
              </li>
              <li>
                You must be of legal drinking age to use this website and order
                goods and services from Life is Grape.
              </li>
              <li>
                All wines are sold by the bottle, unless otherwise indicated.
              </li>
              <li>Prices include VAT.</li>
              <li>
                Orders can be placed via our website or by email to
                wine@lifeisgrap.co.za. Payment should only be made after orders
                have been approved.
              </li>
              <li>
                We accept the following payment methods: bank transfer, Instant
                EFT
              </li>
              <li>
                If any payment is overdue we shall be entitled to suspend
                deliveries/collections. Life is Grape reserves the right to
                cancel orders in whole or in part as circumstances dictate.
              </li>
              <li>
                If goods or services are no longer available after payment has
                been made, users will be refunded.
              </li>
              <li>
                In the case of items or services being mistakenly under-priced,
                we will not be obliged to provide the item at the stated price
                provided that we notify you before the item is delivered/before
                the service commences. If you no longer wish to proceed with the
                order, a full refund will be issued.
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
              Delivery and Returns Policy
            </h2>
            <ul className='space-y-2 text-gray-600 list-disc list-inside'>
              <li>
                View our delivery charges{' '}
                <Link
                  href='/delivery-charges'
                  className='text-blue-600 hover:underline'
                >
                  here
                </Link>
                .
              </li>
              <li>
                You must inspect all goods when collecting or on delivery. In
                the event of incorrect order fulfilment or damage, please
                contact Life is Grape within 3 days of delivery. Thereafter, you
                will not be entitled to a refund.
              </li>
              <li>
                Every effort is made to ensure that orders are fulfilled
                correctly. If, however, you do not receive exactly what you have
                ordered, we will gladly rectify the problem or provide a full
                refund at no extra cost.
              </li>
              <li>
                If you have any questions or concerns regarding our returns
                policy, please contact wine@lifeisgrap.co.za
              </li>
              <li>
                Life is Grape delivers nationwide and offers free delivery on
                wine orders over R1,200 in Port Elizabeth. (maximum of 35km
                radius) Please note that timeframes are an estimate only and are
                not intended to be binding.
              </li>
              <li>
                It is the customer's responsibility to ensure that the delivery
                address is entered correctly. Life is Grape will not be liable
                for loss, damage or expense caused by input errors.
              </li>
            </ul>
          </section>

          <p className='mt-8 text-sm text-gray-500'>
            Last updated: <time dateTime='2025-02-01'>1 February 2025</time>
          </p>
        </div>
      </div>
    </div>
  )
}
