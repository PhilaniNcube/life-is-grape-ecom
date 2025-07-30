import { NextRequest, NextResponse } from 'next/server'
import { verifyOrderPayment } from '@/actions/orders'
import { Id } from '@/convex/_generated/dataModel'

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      )
    }

    const result = await verifyOrderPayment(orderId as Id<'orders'>)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
          data: result.data,
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          data: result.data,
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in verify-payment API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      )
    }

    const result = await verifyOrderPayment(orderId as Id<'orders'>)

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
          data: result.data,
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          data: result.data,
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in verify-payment API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
