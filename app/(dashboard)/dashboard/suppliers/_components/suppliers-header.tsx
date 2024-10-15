import NewSupplierDialog from "./new-supplier-dialog";

const SuppliersHeader = () => {
  return <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold">Suppliers/Wineries</h2>
    <NewSupplierDialog />
  </div>;
};
export default SuppliersHeader;
