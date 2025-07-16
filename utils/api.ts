import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b62d5041`;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Sales data methods
  async getSalesData() {
    return this.request<any[]>('/sales');
  }

  async createSale(saleData: {
    product: string;
    customer: string;
    units: number;
    revenue: number;
    status?: string;
  }) {
    return this.request<any>('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  }

  // Analytics methods
  async getRevenueAnalytics() {
    return this.request<any[]>('/analytics/revenue');
  }

  async getTopProducts() {
    return this.request<any[]>('/analytics/top-products');
  }

  async getDashboardSummary() {
    return this.request<any>('/analytics/summary');
  }

  // Contact form method
  async submitContact(contactData: {
    name: string;
    email: string;
    phone?: string;
    interest: string;
    message: string;
  }) {
    return this.request<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request<any>('/health');
  }
}

export const apiClient = new ApiClient();