import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import useGetAllCountries from "../api/countries/useGetAllCountries";
import { Country } from "../api/countries/countries.types";
import CountryCard, { CARD_HEIGHT } from "../components/CountryCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootStack";
import StyleGuide from "../styles/StyleGuide";
import VerticalItemSeparator, {
  VERTICAL_SEPARATOR_HEIGHT,
} from "../components/VerticalItemSeparator";

const CountriesPage = () => {
  const { data, isLoading, isError } = useGetAllCountries();
  const [keyword, setKeyword] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search Country...",
        hideWhenScrolling: false,
        onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          onSearch(e.nativeEvent.text),
      },
    });
  }, [navigation]);

  const onSearch = (value: string) => {
    if (value.trim() !== null) {
      setKeyword(value);
    }
  };

  /**
   * Takes the list of countries and filters by the given keyword.
   * @param countries: List of countries return from get all countries request
   * */
  const getFilteredCountries = (countries: Country[]): Country[] => {
    return countries.filter((country) => country.name.official.includes(keyword));
  };

  const goToRatesPage = useCallback(
    (country: Country) => () => {
      navigation.navigate("Rates", {
        country: {
          name: country.name.common,
          flag: country.flag,
          capital: !!country.capital ? country.capital.toLocaleString() : undefined,
          population: country.population,
          currencies: !!country.currencies ? Object.keys(country.currencies) : [],
        },
      });
    },
    [],
  );

  if (isError) {
    Alert.alert(
      "Oops! Something went wrong.",
      "Couldn't get the list of countries. Please try again.",
    );
  }

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={goToRatesPage(item)}>
      <CountryCard {...{ item }} />
    </TouchableOpacity>
  );

  const keyExtractor = (item: Country) => item.name.official;

  const getItemLayout = (data: Country[] | null | undefined, index: number) => ({
    length: CARD_HEIGHT,
    offset: (CARD_HEIGHT + VERTICAL_SEPARATOR_HEIGHT) * index,
    index,
  });

  const ItemSeparatorComponent = () => <VerticalItemSeparator />;

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      {!!data && (
        <FlatList
          {...{ renderItem, keyExtractor, ItemSeparatorComponent, getItemLayout }}
          data={getFilteredCountries(data)}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={8}
          contentInsetAdjustmentBehavior="automatic"
          contentInset={{ top: StyleGuide.spacing.md }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StyleGuide.spacing.md,
  },
});

export default CountriesPage;
