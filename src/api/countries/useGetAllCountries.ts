import ROUTES from "../routes";
import { Country } from "./countries.types";
import { useQuery, UseQueryResult } from "react-query";

const QUERY_KEY = "COUNTRIES";

const getAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(ROUTES.GET_COUNTRIES);
  return response.json();
};

export default function useGetAllCountries(): UseQueryResult<Country[]> {
  return useQuery<Country[]>(QUERY_KEY, ({}) => getAllCountries());
}
