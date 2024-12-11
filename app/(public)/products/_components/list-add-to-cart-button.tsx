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
  variants,
}: {
  product: ProductWithImage
  variants: ProductVariant[]
}) => {
  const { addToCart, toggleCart } = useCartStore(state => state)

  // exclude the product variants from the product object

  if (!variants || !product) return null

  return (
    <Button
      variant='outline'
      className='text-xs font-medium text-slate-600 outline-4 outline-slate-600'
      onClick={() => addToCart(product, variants[0])}
    >
      Add To Cart
      <ShoppingBagIcon className='ml-2 h-3 w-3' />
    </Button>
  )
}
export default ListAddToCartButton;
