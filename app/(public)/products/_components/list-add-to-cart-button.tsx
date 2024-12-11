"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/store/cart-store-provider";
import { useQuery } from "convex/react";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";


type ProductVariant = Doc<"product_variants">;
type Product = Omit<Doc<'products'>, 'main_image'> & {
  main_image: { __tableName: "_storage" }
}
// define a type for the product prop that has been extended to include the product variants
type ExtendedProduct = Product & { variants: ProductVariant[] };


type ListAddToCartButtonProps = {
  product: Product
}

const ListAddToCartButton = ({ product_id }: {product_id:Id<"products">}) => {

  const variants = useQuery(api.products.getProductVariants, {product_id: product_id})
  const product = useQuery(api.products.getShallowProduct, {id: product_id})


  const { addToCart, toggleCart } = useCartStore(state => state)

  // exclude the product variants from the product object

  if (!variants || !product) return null

  return (
    <Button
      variant="outline"
      className='text-slate-600 text-xs outline-slate-600 font-medium outline-4'
      onClick={() => addToCart(product, variants[0])}
    >
      Add To Cart
      <ShoppingBagIcon className='w-3 h-3 ml-2' />
    </Button>
  )
}
export default ListAddToCartButton;
