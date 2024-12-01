'use client'

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function OrdersChart() {

  const paidOrders = useQuery(api.orders.getOrders)

  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[200px] px-8 py-6 w-full max-w-[700px] mt-6 rounded-lg shadow-lg'
    >
      <LineChart accessibilityLayer data={paidOrders} className=''>
        <CartesianGrid vertical={false}  />
        <Line dataKey='total' radius={4} className='hover:bg-black shadow-xl' />
        <YAxis
          tickLine={true}
          tickMargin={5}
          axisLine={true}
          tickFormatter={value => `R${value}`}
        />
        <XAxis
          dataKey='reference'
          tickLine={true}
          tickMargin={50}
          axisLine={true}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip
          labelClassName='bg-blue-200'
          wrapperClassName='bg-blue-200'
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}
