import GiftProductForm from './_components/create-gift'
import GiftTable from './_components/gift-table'

const DashboardGiftsPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <GiftTable />
      </div>
      <GiftProductForm />
    </div>
  )
}
export default DashboardGiftsPage
