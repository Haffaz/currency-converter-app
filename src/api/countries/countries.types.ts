export interface Currency {
  name: string;
  symbol: string;
}

export interface LanguageInfo {
  official: string;
  common: string;
}

export interface Demonyms {
  f: string;
  m: string;
}

export type TranslationCode =
  | "ara"
  | "ces"
  | "cym"
  | "deu"
  | "est"
  | "fin"
  | "fra"
  | "hrv"
  | "hun"
  | "ita"
  | "jpn"
  | "kor"
  | "nld"
  | "per"
  | "pol"
  | "por"
  | "rus"
  | "slk"
  | "spa"
  | "swe"
  | "urd"
  | "zho";

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, LanguageInfo>;
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<string, Currency>;
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  translations: Record<TranslationCode, LanguageInfo>;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Record<string, Demonyms>;
  flag: symbol;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: Record<string, number>;
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode: {
    format: string;
    regex: string;
  };
}
