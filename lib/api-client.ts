import axios, { AxiosError, AxiosInstance } from 'axios';
import { log } from '@/lib/logger';

const TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const requestId = crypto.randomUUID();
        config.headers['X-Request-ID'] = requestId;
        log.info('API Request', { 
          requestId,
          method: config.method,
          url: config.url 
        });
        return config;
      },
      (error) => {
        log.error('API Request Error', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        log.info('API Response', {
          requestId: response.config.headers['X-Request-ID'],
          status: response.status,
        });
        return response;
      },
      async (error: AxiosError) => {
        const config = error.config;
        if (!config) return Promise.reject(error);

        config.retryCount = config.retryCount ?? 0;

        if (config.retryCount >= MAX_RETRIES) {
          log.error('Max retries reached', error, {
            requestId: config.headers['X-Request-ID'],
          });
          return Promise.reject(error);
        }

        if (this.shouldRetry(error)) {
          config.retryCount += 1;
          log.warn('Retrying request', {
            requestId: config.headers['X-Request-ID'],
            attempt: config.retryCount,
          });

          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * config.retryCount));
          return this.client(config);
        }

        log.error('API Response Error', error, {
          requestId: config.headers['X-Request-ID'],
          status: error.response?.status,
        });
        return Promise.reject(error);
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    if (!error.response) return true; // Network errors
    return [408, 429, 500, 502, 503, 504].includes(error.response.status);
  }

  async get<T>(url: string, config = {}) {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  async post<T>(url: string, data: any, config = {}) {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  private handleError(error: Error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('No response received from server');
      }
    }
    throw error;
  }
}

export const apiClient = new ApiClient();