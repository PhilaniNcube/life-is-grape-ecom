'use client'

import { Doc, Id } from '@/convex/_generated/dataModel'
import { updateOrderStatus } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn, formatPrice } from '@/lib/utils'
import { startTransition, useActionState, useState } from 'react'
import { useCartStore } from '@/store/cart-store-provider'
import Voucher from '../../_components/voucher'
import { useRef } from 'react'
import { createPersonalisedLabel } from '@/actions/personalised-labels'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const PaymentForm = ({ order }: { order: Doc<'orders'> }) => {
  const [state, formAction, isPending] = useActionState(updateOrderStatus, null)
  const { clearCart, cart } = useCartStore(state => state)
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploadingLabel, setUploadingLabel] = useState(false)
  const generateUploadUrl = useMutation(api.personalised_labels.generatePersonalisedLabelUploadUrl);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedImageId, setUploadedImageId] = useState<string>('');

  const [labelUploaded, setLabelUploaded] = useState<boolean>(false);

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingLabel(true);
      setUploadStatus('uploading');
      
      // Get the upload URL
      const uploadUrl = await generateUploadUrl();

      console.log('Upload URL:', uploadUrl);
      console.log('File:', file.name, file.type, file.size); 
      
      // Upload the image
      const result = await fetch(uploadUrl, {
        method: 'POST',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!result.ok) throw new Error('Upload failed');

      // Get the storage ID from the upload URL
      const storageId = await result.json()
      setUploadedImageId(storageId);
      setUploadStatus('success');
      
      return storageId;
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      throw error;
    } finally {
      setUploadingLabel(false);
    }
  };

  // Check if there are any personalized label products in the cart
  const hasPersonalizedLabels = cart.some(item => 
    item.product.product_type === 'custom_label'
  )

  const [code, setCode] = useState('')
  const [voucherValue, setVoucherValue] = useState(0)

  const orderTotal = order.voucher_value
    ? order.subtotal - order.voucher_value + order.shipping
    : order.total

  return (
    <div className='my-8'>
      <Card className='mx-auto max-w-6xl'>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 flex flex-col md:flex-row md:space-x-4 md:space-y-0'>
          <div className="w-full p-4">
          <div className='space-y-2'>
            <h3 className='font-semibold'>Customer Details</h3>
            <div>
              <p className='font-medium'>
                {order.first_name} {order.last_name}
              </p>
              <p>{order.shipping_address.street}</p>
              <p>{order.shipping_address.city}</p>
              <p>{order.shipping_address.postal_code}</p>
              <p>{order.shipping_address.province}</p>
            </div>
          </div>
          <Separator />
            {/* Personalized Label Form */}
            {hasPersonalizedLabels && labelUploaded === false && (
            <>
              <Separator />
              <div className='space-y-2'>
                <h3 className='font-semibold'>Personalized Label</h3>
                <form action={async (formData) => {
                  try {
                    const file = fileRef.current?.files?.[0];
                    if (!file) return;
              
                    // Upload the image first
                    const result = await handleImageUpload(file);
                    console.log('Storage ID:', result.storageId);
                    
                    // Add the storage ID to the form data
                    formData.append('image', result.storageId);
                    
                    startTransition(async () => {
                     const res = await createPersonalisedLabel(null, formData);

                      console.log('Form submission result:', res);
                      setLabelUploaded(res.success);
                      
                    });
                  } catch (error) {
                    console.error('Form submission error:', error);
                  }
                }} className='space-y-4'>
                  <input type="hidden" name="order_id" value={order._id} />
                  <div>
                    <Label className='block text-sm font-medium mb-1'>
                      Upload Label Image
                    </Label>
                    <Input
                      ref={fileRef}
                      type="file"
                      name="image_upload"
                      accept="image/*"
                      className='w-full'
                      required
                      disabled={uploadStatus === 'uploading'}
                    />
                    {uploadStatus === 'uploading' && <p className="text-sm text-blue-500">Uploading...</p>}
                    {uploadStatus === 'success' && <p className="text-sm text-green-500">Upload successful</p>}
                    {uploadStatus === 'error' && <p className="text-sm text-red-500">Upload failed</p>}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Label Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      className='w-full border rounded-md p-2'
                      placeholder='Enter your personalized message'
                      maxLength={500}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={uploadingLabel}
                    
                    className={cn('w-full bg-blue-800 rounded-none', uploadingLabel && 'opacity-50 animate-pulse')}
                  >
                    {uploadingLabel ? 'Uploading...' : 'Upload Label'}
                  </Button>
                </form>
              </div>
            </>
          )}

          {labelUploaded && (
            <div className='bg-green-100 p-4 text-green-800 mt-8'>
              <p>Personalized label uploaded successfully! Continue to confirm payment.</p>
            </div>
          )}
              
          </div>
         
        
 
          <div className='space-y-2 w-full max-w-xl p-4 flex flex-col justify-between bg-gray-100'>
          <h3 className='font-semibold'>Payment Summary</h3>
          <Separator />
          <Voucher
            code={code}
            setCode={setCode}
            setVoucherValue={setVoucherValue}
            order_id={order._id}
          />
            {order.voucher_value && (
              <div className='flex justify-between bg-blue-600 p-2 text-white'>
                <small>Voucher</small>
                <small>{formatPrice(order.voucher_value)}</small>
              </div>
            )}
            <div className='flex justify-between'>
              <span>Subtotal</span>

              <div className='flex flex-col'>
                <small className={cn(order.voucher_value && 'line-through')}>
                  {formatPrice(order.subtotal)}
                </small>
                <small>
                  {order.voucher_value &&
                    formatPrice(order.subtotal - order.voucher_value)}
                </small>
              </div>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
            <form
            action={() => {
              const data = new FormData()

              data.append('order_id', order._id)
              data.append('email', order.email)
              data.append('amount', orderTotal.toString())

              startTransition(() => {
                formAction(data)
                // clearCart()
              })
            }}
            className=''
          >
            <div className="flex items-end flex-grow h-full flex-1">
            <Button
              disabled={isPending}
              className='w-full rounded-none'
              size='lg'
            >
              Confirm Order
            </Button>
            </div>
            
          </form>
          </div>

   
        </CardContent>
      </Card>
    </div>
  )
}
export default PaymentForm
