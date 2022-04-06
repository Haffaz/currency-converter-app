import React from "react";
import { Country } from "../api/countries/countries.types";
import { Image, StyleSheet, Text, View } from "react-native";

type CountryCardProp = {
  item: Country;
};

const CountryCard = ({ item }: CountryCardProp) => (
  <View style={styles.container}>
    <View style={styles.flagWrapper}>
      <Image source={{ uri: item.flags.png }} style={styles.flagImg} />
    </View>
    <View style={styles.detailsContainer}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.name}>
          {item.name.official}
        </Text>
        <Text style={styles.capital}>{item.capital}</Text>
      </View>
      {!!item.currencies && (
        <View style={styles.currencyContainer}>
          {Object.values(item.currencies).map((currency, index) => (
            <Text key={currency.name} style={styles.currency}>
              {currency.name}
              {index < Object.values(item.currencies).length - 1 && ", "}
            </Text>
          ))}
        </View>
      )}
    </View>
    <View>
      <View style={styles.populationContainer}>
        <Text style={styles.populationTitle}>Population</Text>
        <Text style={styles.population}>{item.population.toLocaleString()}</Text>
      </View>
    </View>
  </View>
);

const FLAG_HEIGHT = 213 * 0.4;
const FLAG_WIDTH = 320 * 0.4;
const CARD_HEIGHT = FLAG_HEIGHT + 32;

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
  },
  flagWrapper: {
    width: FLAG_WIDTH,
    height: FLAG_HEIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  flagImg: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  currencyContainer: {
    // flexDirection: "row",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  capital: {
    fontSize: 10,
    color: "grey",
  },
  currency: {
    fontSize: 12,
  },
  populationContainer: {
    alignItems: "flex-end",
  },
  populationTitle: {
    fontSize: 10,
    color: "grey",
  },
  population: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CountryCard;
