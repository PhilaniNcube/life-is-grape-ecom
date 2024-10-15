import NewBrandDialog from "./new-brand-dialog";

const BrandsHeader = () => {
  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-xl font-semibold'>Brands</h2>
      <NewBrandDialog />
    </div>
  )
};
export default BrandsHeader;
