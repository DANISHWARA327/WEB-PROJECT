import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Sales data endpoint
app.get('/make-server-b62d5041/sales', async (c) => {
  try {
    const salesData = await kv.get('sales_data')
    
    if (!salesData) {
      // Initialize with mock data if not exists
      const mockSalesData = [
        { id: 'ORD-001', product: 'Porsche 911 GT3 RS', customer: 'John Smith', date: '2025-01-10', units: 1, revenue: 185000, status: 'Completed' },
        { id: 'ORD-002', product: 'BMW M4 Competition', customer: 'Sarah Johnson', date: '2025-01-12', units: 1, revenue: 98000, status: 'Processing' },
        { id: 'ORD-003', product: 'Mercedes AMG GT', customer: 'Mike Davis', date: '2025-01-14', units: 1, revenue: 142000, status: 'Completed' },
        { id: 'ORD-004', product: 'Audi RS6 Avant', customer: 'Emily Chen', date: '2025-01-15', units: 1, revenue: 115000, status: 'Pending' },
        { id: 'ORD-005', product: 'Lamborghini Huracan', customer: 'Robert Wilson', date: '2025-01-16', units: 1, revenue: 275000, status: 'Completed' },
      ]
      await kv.set('sales_data', mockSalesData)
      return c.json({ success: true, data: mockSalesData })
    }

    return c.json({ success: true, data: salesData })
  } catch (error) {
    console.log('Error fetching sales data:', error)
    return c.json({ success: false, error: 'Failed to fetch sales data' }, 500)
  }
})

// Add new sale endpoint
app.post('/make-server-b62d5041/sales', async (c) => {
  try {
    const body = await c.req.json()
    const { product, customer, units, revenue, status = 'Pending' } = body

    if (!product || !customer || !units || !revenue) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    const existingSales = await kv.get('sales_data') || []
    const newSale = {
      id: `ORD-${String(existingSales.length + 1).padStart(3, '0')}`,
      product,
      customer,
      date: new Date().toISOString().split('T')[0],
      units,
      revenue,
      status
    }

    const updatedSales = [...existingSales, newSale]
    await kv.set('sales_data', updatedSales)

    return c.json({ success: true, data: newSale })
  } catch (error) {
    console.log('Error creating new sale:', error)
    return c.json({ success: false, error: 'Failed to create sale' }, 500)
  }
})

// Revenue analytics endpoint
app.get('/make-server-b62d5041/analytics/revenue', async (c) => {
  try {
    const revenueData = await kv.get('revenue_data')
    
    if (!revenueData) {
      // Initialize with mock data
      const mockRevenueData = [
        { month: 'Jan', revenue: 245000, orders: 18 },
        { month: 'Feb', revenue: 312000, orders: 24 },
        { month: 'Mar', revenue: 198000, orders: 15 },
        { month: 'Apr', revenue: 278000, orders: 21 },
        { month: 'May', revenue: 389000, orders: 29 },
        { month: 'Jun', revenue: 435000, orders: 32 },
        { month: 'Jul', revenue: 402000, orders: 30 },
      ]
      await kv.set('revenue_data', mockRevenueData)
      return c.json({ success: true, data: mockRevenueData })
    }

    return c.json({ success: true, data: revenueData })
  } catch (error) {
    console.log('Error fetching revenue analytics:', error)
    return c.json({ success: false, error: 'Failed to fetch revenue analytics' }, 500)
  }
})

// Top products endpoint
app.get('/make-server-b62d5041/analytics/top-products', async (c) => {
  try {
    const topProducts = await kv.get('top_products_data')
    
    if (!topProducts) {
      // Initialize with mock data
      const mockTopProducts = [
        { name: 'Porsche 911', sales: 25, revenue: 2750000 },
        { name: 'BMW M3', sales: 18, revenue: 1530000 },
        { name: 'Mercedes AMG GT', sales: 15, revenue: 2100000 },
        { name: 'Audi R8', sales: 12, revenue: 2400000 },
        { name: 'Lamborghini Huracan', sales: 8, revenue: 2000000 },
      ]
      await kv.set('top_products_data', mockTopProducts)
      return c.json({ success: true, data: mockTopProducts })
    }

    return c.json({ success: true, data: topProducts })
  } catch (error) {
    console.log('Error fetching top products:', error)
    return c.json({ success: false, error: 'Failed to fetch top products' }, 500)
  }
})

// Dashboard summary endpoint
app.get('/make-server-b62d5041/analytics/summary', async (c) => {
  try {
    const salesData = await kv.get('sales_data') || []
    const revenueData = await kv.get('revenue_data') || []
    
    // Calculate summary metrics
    const totalRevenue = salesData.reduce((sum: number, sale: any) => sum + sale.revenue, 0)
    const totalOrders = salesData.length
    const completedOrders = salesData.filter((sale: any) => sale.status === 'Completed').length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    // Calculate growth (mock calculation)
    const lastMonthRevenue = revenueData.length > 1 ? revenueData[revenueData.length - 2].revenue : 0
    const currentMonthRevenue = revenueData.length > 0 ? revenueData[revenueData.length - 1].revenue : 0
    const revenueGrowth = lastMonthRevenue > 0 ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0

    const summary = {
      totalRevenue,
      totalOrders,
      completedOrders,
      averageOrderValue,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      activeCustomers: 1234, // Mock value
      vehiclesInStock: 89, // Mock value
    }

    return c.json({ success: true, data: summary })
  } catch (error) {
    console.log('Error generating dashboard summary:', error)
    return c.json({ success: false, error: 'Failed to generate summary' }, 500)
  }
})

// Contact form endpoint
app.post('/make-server-b62d5041/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, phone, interest, message } = body

    if (!name || !email || !message) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    const contactData = {
      id: `CONTACT-${Date.now()}`,
      name,
      email,
      phone,
      interest,
      message,
      timestamp: new Date().toISOString(),
      status: 'new'
    }

    // Store contact submission
    const existingContacts = await kv.get('contact_submissions') || []
    const updatedContacts = [...existingContacts, contactData]
    await kv.set('contact_submissions', updatedContacts)

    return c.json({ success: true, message: 'Contact form submitted successfully' })
  } catch (error) {
    console.log('Error processing contact form:', error)
    return c.json({ success: false, error: 'Failed to process contact form' }, 500)
  }
})

// Health check endpoint
app.get('/make-server-b62d5041/health', (c) => {
  return c.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() })
})

Deno.serve(app.fetch)