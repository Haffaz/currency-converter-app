export interface CountryBasicInfo {
  name: string;
  flag: symbol;
  currencies: Array<string>;
}

export interface ConvertedValue {
  currency: string;
  amount: number;
}
