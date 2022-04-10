import ROUTES, { API_KEY } from "../routes";
import { useMutation } from "react-query";
import { GetLatestRatesParams, LatestRatesResponse } from "./latestRatest.types";

const QUERY_KEY = "LATEST_EXCHANGE_RATES";

type UseGetLatestRatesProps = {
  onSuccess: (resp: LatestRatesResponse) => void;
};

const getLatestExchangeRates = async ({ symbols }: GetLatestRatesParams) => {
  const params = `?access_key=${API_KEY}&symbols=${symbols}`;
  const res = await fetch(ROUTES.GET_LATEST_RATES + params, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export default function useGetLatestExchangeRates({ onSuccess }: UseGetLatestRatesProps) {
  return useMutation<LatestRatesResponse, Error, GetLatestRatesParams>(
    QUERY_KEY,
    (params) => getLatestExchangeRates(params),
    { onSuccess: (data) => onSuccess(data) },
  );
}
