export interface LatestRatesResponse {
  success: boolean;
  timestamp?: number;
  base?: string;
  date?: string;
  rates?: Record<string, number>;
  error?: Error;
}

export interface Error {
  code: string;
  type: string;
}

export interface GetLatestRatesParams {
  symbols: string;
}
