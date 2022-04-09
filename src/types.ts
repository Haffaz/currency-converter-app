export interface CountryBasicInfo {
  name: string;
  capital?: string;
  population: number;
  flag: symbol;
  currencies: Array<string>;
}

export interface ConvertedValue {
  currency: string;
  amount: number;
}
