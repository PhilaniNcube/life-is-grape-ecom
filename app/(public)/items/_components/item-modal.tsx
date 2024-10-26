import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Doc } from "@/convex/_generated/dataModel"
import Image from "next/image"

function ProductModal({product}:{product:Doc<"products">}) {
  return (
    <Dialog>
      <DialogContent className='flex max-h-[80vh] max-w-3xl flex-col overflow-hidden'>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className='flex-grow'>
          <div className='space-y-4 p-4'>
            <div className='flex justify-center'>
              <Image
                src={`/placeholder.svg?height=300&width=300`}
                alt={`${product.name} bottle`}
                width={300}
                height={300}
                className='rounded-lg'
              />
            </div>
            <Tabs defaultValue='description'>
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='description'>Description</TabsTrigger>
                <TabsTrigger value='tasting'>Tasting Notes</TabsTrigger>
                <TabsTrigger value='pairing'>Food Pairing</TabsTrigger>
                <TabsTrigger value='cocktails'>Cocktails</TabsTrigger>
              </TabsList>
              <TabsContent value='description' className='mt-4'>
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value='tasting' className='mt-4'>
                {product.tasting_notes ? (
                  <p>{product.tasting_notes}</p>
                ) : (
                  <p>No tasting notes available.</p>
                )}
              </TabsContent>
              <TabsContent value='pairing' className='mt-4'>
                <p>{product.pairing_suggestions}</p>
              </TabsContent>
              <TabsContent value='cocktails' className='mt-4'>
                <div className='space-y-4'>
                  <div className='border-b pb-4 last:border-b-0'>
                    <h4 className='mb-2 font-semibold'>
                      {product.suggested_cocktail.name}
                    </h4>
                    <p className='mb-2 text-sm'>
                      <strong>Ingredients:</strong>{' '}
                      {product.suggested_cocktail.ingredients}
                    </p>
                    <p className='text-sm'>
                      <strong>Instructions:</strong>{' '}
                      {product.suggested_cocktail.description}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
