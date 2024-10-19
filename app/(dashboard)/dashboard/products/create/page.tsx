import NewBrandDialog from "../../brands/_components/new-brand-dialog";
import NewSupplierDialog from "../../suppliers/_components/new-supplier-dialog";
import NewProductForm from "../_components/new-product-form";

const CreateProductPage = () => {
  return (
    <div>
      <div className='flex gap-5 mb-4'>
        <NewBrandDialog />
        <NewSupplierDialog />
      </div>
      <NewProductForm />
    </div>
  )
};
export default CreateProductPage;
