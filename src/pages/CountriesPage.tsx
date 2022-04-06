import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import useGetAllCountries from "../api/countries/useGetAllCountries";
import { Country } from "../api/countries/countries.types";
import CountryCard from "../components/CountryCard";

const CountriesPage = () => {
  const { data, isLoading, isError } = useGetAllCountries();

  const renderItem = ({ item }: { item: Country }) => <CountryCard {...{ item }} />;

  const keyExtractor = (item: Country) => item.name.official;

  const ItemSeparatorComponent = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      <Text>Countries</Text>
      {isLoading && <ActivityIndicator />}
      {!!data && (
        <FlatList
          {...{ renderItem, keyExtractor, ItemSeparatorComponent }}
          data={data}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});

export default CountriesPage;
