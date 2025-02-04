"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useCartStore } from "@/store/cart-store-provider";
import { useQuery } from "convex/react";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";


type ProductVariant = Doc<"product_variants">;

// define a type for the product prop where the main_image is a string
type ProductWithImage = Omit<Doc<'products'>, 'main_image'> & {
  main_image: string
}


const ListAddToCartButton = ({
  product,

}: {
  product: ProductWithImage

}) => {
  const { addToCart, toggleCart } = useCartStore(state => state)

  // exclude the product variants from the product object

  if ( !product) return null

  return (
    <Button
      variant='outline'
      className='border-slate-600 text-xs font-medium text-slate-600 outline-4 outline-slate-600 '
      onClick={() => addToCart(product)}
    >
      <span className="hidden lg:inline-block">Add To Cart</span>
      <ShoppingBagIcon className='lg:ml-2 h-4 w-4' />
    </Button>
  )
}
export default ListAddToCartButton;
