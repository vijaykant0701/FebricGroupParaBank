import { APIRequestContext } from '@playwright/test';
import { config } from './config'; // Update path as needed

export class ApiClient {
  private readonly requestContext: APIRequestContext;
  private readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.requestContext = request;
    this.baseUrl = config.baseUrl;
  }

  /**
   * Makes an API request
   */
  async makeRequest(
    method: string,
    endpoint: string,
    options?: {
      headers?: Record<string, string>;
      data?: any;
      params?: Record<string, string | number>;
    }
  ) {
    const url = `${this.baseUrl}${endpoint}`;
    return this.requestContext.fetch(url, {
      method,
      headers: options?.headers,
      data: options?.data,
      params: options?.params
    });
  }

  /**
   * Finds transactions by amount using configured endpoint
   */
  async findTransactionsByAmount(accountId: string, amount: string) {
    const endpoint = config.testData.api.transactions.findByAmount.endpoint
      .replace('{accountId}', accountId)
      .replace('{amount}', amount);

    return this.makeRequest(
      config.testData.api.transactions.findByAmount.method,
      endpoint,
      {
        headers: config.testData.api.transactions.findByAmount.headers
      }
    );
  }
}