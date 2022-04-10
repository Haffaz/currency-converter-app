import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootStack";
import ConvertButton from "../components/ConvertButton";
import useGetLatestExchangeRates from "../api/exchangeRates/useGetLatestExchangeRates";
import mapRecordToArray from "../util/mapRecordToArray";
import { ConvertedValue } from "../types";
import StyleGuide, { FONTS } from "../styles/StyleGuide";

type Props = NativeStackScreenProps<RootStackParams, "Rates">;

export const SEK_CODE = "SEK";

const RatesPage = ({ route }: Props) => {
  const { country } = route.params;
  const [amount, setAmount] = useState("");
  const [convertedValues, setConvertedValues] = useState<ConvertedValue[]>(
    country.currencies.map((currency) => ({ currency: currency, amount: 0 })),
  );

  const { mutate, data, isLoading } = useGetLatestExchangeRates({
    onSuccess: (response) => {
      // console.debug("LatestRatesResponse", response);
      if (response.rates !== undefined) {
        calculateRates(response.rates);
      }
      // TODO: if (response.error !==  null) { handle error }
    },
  });

  /**
   * Takes value from text input and check if value is a valid number number and sets value to state.
   * @param value: TextInput value
   * */
  const setValidAmount = (value: string) => {
    if (Number.isNaN(value) || value.trim() == null) {
      Alert.alert("Invalid amount !", "Amount should be a valid number.");
    } else {
      setAmount(value.trim());
    }
  };

  /**
   * Calls mutation functions to get exchange rates if amount is not null.
   * */
  const fetchExchangeRates = () => {
    if (!!amount && amount.length > 0) {
      mutate({ symbols: `${country.currencies.toLocaleString()},${SEK_CODE}` });
    } else {
      Alert.alert("Invalid amount !", "Please enter an amount to be converted.");
    }
  };

  /**
   * Calculates exchange rates if rates have been fetched,
   * or else will fetch the exchange rates on button click
   * */
  const handleConversion = () => {
    if (!!data && !!data.rates) {
      calculateRates(data.rates);
    } else {
      fetchExchangeRates();
    }
  };

  /**
   * Calculates conversion rates for given rates record and sets to state
   * @param ratesRecord: Record of rates
   * */
  const calculateRates = (ratesRecord: Record<string, number>) => {
    const rates = mapRecordToArray<string, number>(ratesRecord); // Array of rates mapped from given records
    const eurToSekRate = rates.find((rate) => rate.key === SEK_CODE); // SEK value for 1EUR
    const filteredRates = rates.filter((rate) => rate.key !== SEK_CODE); // Rates without SEK

    const latestConvertedValues: ConvertedValue[] = filteredRates.map(({ key, value }) => {
      const exchangeRate = value / eurToSekRate!.value; // Given currency's value of 1 SEK
      const convertedValue = exchangeRate * Number(amount); // Given currency's  value of entered amount of SEK
      return { currency: key, amount: convertedValue };
    });

    setConvertedValues(latestConvertedValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter Amount (SEK)"
          value={amount.toLocaleString()}
          onChangeText={setValidAmount}
          keyboardType="numeric"
          style={[styles.textInput, styles.inputFont]}
        />
        <View style={styles.inputLeftContainer}>
          <Text style={styles.flag}>🇸🇪</Text>
          <Text style={styles.currencyCode}>SEK</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <ConvertButton {...{ isLoading }} onPress={handleConversion}  />
      </View>
      <View style={styles.countryDetailsContainer}>
        <View>
          <Text style={styles.countryName}>{country.name}</Text>
          {!!country.capital && <Text style={styles.capital}>{country.capital}</Text>}
        </View>
        <View>
          <Text style={styles.populationTitle}>Population</Text>
          <Text style={styles.population}>{country.population}</Text>
        </View>
      </View>
      {!!convertedValues &&
        convertedValues.length > 0 &&
        convertedValues.map(({ currency, amount }) => (
          <View key={currency} style={styles.inputWrapper}>
            <View style={styles.textInput}>
              <Text style={styles.inputFont}>{amount.toFixed(4)}</Text>
            </View>
            <View style={styles.inputLeftContainer}>
              <Text style={styles.flag}>{country.flag}</Text>
              <Text style={styles.currencyCode}>{currency}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StyleGuide.spacing.md,
  },
  inputWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 45,
    borderRadius: StyleGuide.spacing.sm,
    alignItems: "center",
    padding: StyleGuide.spacing.sm,
    marginVertical: StyleGuide.spacing.sm,
  },
  inputLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: StyleGuide.spacing.xs,
  },
  currencyCode: {
    fontSize: 20,
    fontFamily: FONTS.Roboto_500Medium,
  },
  textInput: {
    flex: 1,
    marginRight: StyleGuide.spacing.sm,
  },
  inputFont: {
    fontFamily: FONTS.Roboto_300Light,
    fontSize: 24,
  },
  buttonWrapper: {
    alignItems: "center",
    padding: StyleGuide.spacing.md,
  },
  countryDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: StyleGuide.spacing.sm,
  },
  countryName: {
    fontSize: 24,
    fontFamily: FONTS.Roboto_400Regular,
    textAlign: "center",
  },
  capital: {
    fontSize: 10,
    fontFamily: FONTS.Roboto_400Regular,
    color: "grey",
  },
  populationTitle: {
    fontSize: 10,
    fontFamily: FONTS.Roboto_500Medium,
    color: "grey",
    marginBottom: 2,
  },
  population: {
    fontSize: 12,
    fontFamily: FONTS.Roboto_700Bold,
  },
});
export default RatesPage;
