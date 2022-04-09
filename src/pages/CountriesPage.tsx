import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import useGetAllCountries from "../api/countries/useGetAllCountries";
import { Country } from "../api/countries/countries.types";
import CountryCard from "../components/CountryCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/RootStack";

const CountriesPage = () => {
  const { data, isLoading, isError } = useGetAllCountries();
  const [keyword, setKeyword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search Country...",
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

  const getFilteredCountries = (countries: Country[]) => {
    return countries.filter((country) => country.name.official.includes(keyword));
  };

  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToRatesPage = (country: Country) => {
    navigate("Rates", {
      country: {
        name: country.name.common,
        currencies: Object.keys(country.currencies),
        flag: country.flag,
      },
    });
  };

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => goToRatesPage(item)}>
      <CountryCard {...{ item }} />
    </TouchableOpacity>
  );

  const keyExtractor = (item: Country) => item.name.official;

  const ItemSeparatorComponent = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      {!!data && (
        <FlatList
          {...{ renderItem, keyExtractor, ItemSeparatorComponent }}
          data={getFilteredCountries(data)}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          contentInset={{ top: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  separator: {
    height: 16,
  },
});

export default CountriesPage;
