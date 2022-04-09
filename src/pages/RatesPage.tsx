import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootStack";
import ConvertButton from "../components/ConvertButton";
import useGetLatestExchangeRates from "../api/exchangeRates/useGetLatestExchangeRates";
import mapRecordToArray from "../util/mapRecordToArray";

type Props = NativeStackScreenProps<RootStackParams, "Rates">;

export const SEK_CODE = "SEK";

const RatesPage = ({ route }: Props) => {
  const { country } = route.params;
  const [amount, setAmount] = useState("");
  const [convertedValues, setConvertedValues] = useState<{ currency: string; amount: number }[]>(
    [],
  );

  const { mutate, data, isLoading } = useGetLatestExchangeRates({
    onSuccess: (resp) => {
      if (resp.rates !== undefined) {
        calculateRates(resp.rates);
      }
    },
  });

  const validateAmount = (value: string) => {
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
      calculateRates(data.rates);
    } else {
      fetchExchangeRates();
    }
  };

  const calculateRates = (ratesRecord: Record<string, number>) => {
    const rates = mapRecordToArray<string, number>(ratesRecord); // Array of rates mapped from given records
    const eurToSekRate = rates.find((rate) => rate.key === SEK_CODE); // SEK value for 1EUR
    const filteredRates = rates.filter((rate) => rate.key !== SEK_CODE); // rates without SEK

    filteredRates.forEach(({ key, value }) => {
      const exchangeRate = value / eurToSekRate!.value; // given currency's value of 1 SEK
      const convertedValue = exchangeRate * Number(amount); // given currency's  value of entered amount of SEK
      setConvertedValues([...convertedValues, { currency: key, amount: convertedValue }]);
    });
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
    padding: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
  },
  inputLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: 4,
  },
  currencyCode: {
    fontSize: 20,
  },
  textInput: {
    marginRight: 8,
    flex: 1,
  },
  inputFont: {
    fontSize: 24,
  },
  buttonWrapper: {
    alignItems: "center",
    padding: 16,
  },
});
export default RatesPage;