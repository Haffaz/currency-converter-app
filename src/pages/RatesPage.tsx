import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootStack";
import ConvertButton from "../components/ConvertButton";
import useGetLatestExchangeRates from "../api/exchangeRates/useGetLatestExchangeRates";
import mapRecordToArray from "../util/mapRecordToArray";
import { ConvertedValue } from "../types";
import StyleGuide from "../styles/StyleGuide";

type Props = NativeStackScreenProps<RootStackParams, "Rates">;

export const SEK_CODE = "SEK";

const RatesPage = ({ route }: Props) => {
  const { country } = route.params;
  const [amount, setAmount] = useState("");
  const [convertedValues, setConvertedValues] = useState<ConvertedValue[]>([]);

  const { mutate, data, isLoading } = useGetLatestExchangeRates({
    onSuccess: (response) => {
      // console.debug("LatestRatesResponse", response);
      if (response.rates !== undefined) {
        calculateRates(response.rates);
      }
      // TODO: if (response.error !==  null) { handle error }
    },
  });

  const validateAmount = (value: string) => {
    // Check if entered input is not a number
    if (Number.isNaN(value)) {
      Alert.alert("Invalid amount !", "Amount should be a valid number.");
    } else {
      setAmount(value.trim());
    }
  };

  const fetchExchangeRates = () => {
    if (!!amount && amount.length > 0) {
      mutate({ base: `${country.currencies.toLocaleString()},${SEK_CODE}` });
    } else {
      Alert.alert("Invalid amount !", "Please enter an amount to be converted.");
    }
  };

  const handleConversion = () => {
    if (!!data && !!data.rates) {
      // if already fetched exchange rates, calculate rates.
      calculateRates(data.rates);
    } else {
      fetchExchangeRates();
    }
  };

  const calculateRates = (ratesRecord: Record<string, number>) => {
    const rates = mapRecordToArray<string, number>(ratesRecord); // Array of rates mapped from given records
    const eurToSekRate = rates.find((rate) => rate.key === SEK_CODE); // SEK value for 1EUR
    const filteredRates = rates.filter((rate) => rate.key !== SEK_CODE); // Rates without SEK

    const latestConvertedValues: ConvertedValue[] = filteredRates.map(({ key, value }) => {
      const exchangeRate = value / eurToSekRate!.value; // Given currency's value of 1 SEK
      const convertedValue = exchangeRate * Number(amount); // Given currency's  value of entered amount of SEK
      return { currency: key, amount: convertedValue };
    });

    // console.debug("Converted values", latestConvertedValues);
    setConvertedValues(latestConvertedValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter Amount (SEK)"
          value={amount.toLocaleString()}
          onChangeText={validateAmount}
          keyboardType="numeric"
          style={[styles.textInput, styles.inputFont]}
        />
        <View style={styles.inputLeftContainer}>
          <Text style={styles.flag}>🇸🇪</Text>
          <Text style={styles.currencyCode}>SEK</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <ConvertButton onPress={handleConversion} />
      </View>
      <Text>{country.name}</Text>
      {isLoading && <ActivityIndicator />}
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
  },
  textInput: {
    marginRight: StyleGuide.spacing.sm,
    flex: 1,
  },
  inputFont: {
    fontSize: 24,
  },
  buttonWrapper: {
    alignItems: "center",
    padding: StyleGuide.spacing.md,
  },
});
export default RatesPage;
