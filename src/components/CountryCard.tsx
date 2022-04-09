import React, {memo} from "react";
import { Country } from "../api/countries/countries.types";
import { Image, StyleSheet, Text, View } from "react-native";
import StyleGuide from "../styles/StyleGuide";

type CountryCardProp = {
  item: Country;
};

const CountryCard = ({ item }: CountryCardProp) => (
  <View style={styles.container}>
    <View style={styles.flagWrapper}>
      <Image source={{ uri: item.flags.png }} style={styles.flagImg} />
    </View>
    <View style={styles.detailsContainer}>
      <View style={styles.countryInfoContainer}>
        <View style={styles.nameContainer}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
            {item.name.common}
          </Text>
          <Text style={styles.capital}>{item.capital}</Text>
        </View>
        <View style={styles.populationContainer}>
          <Text style={styles.sectionTitle}>Population</Text>
          <Text style={styles.section}>{item.population.toLocaleString()}</Text>
        </View>
      </View>
      {!!item.currencies && (
        <View>
          <Text style={styles.sectionTitle}>Currencies</Text>
          {Object.values(item.currencies).map((currency, index) => (
            <Text key={currency.name} style={styles.currency}>
              {currency.name}
              {index < Object.values(item.currencies).length - 1 && ", "}
            </Text>
          ))}
        </View>
      )}
    </View>
  </View>
);

const FLAG_HEIGHT = 213 * 0.4;
const FLAG_WIDTH = 320 * 0.4;
export const CARD_HEIGHT = FLAG_HEIGHT + 32;

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: "100%",
    borderRadius: StyleGuide.spacing.sm,
    flexDirection: "row",
    backgroundColor: "white",
    padding: StyleGuide.spacing.md,
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
    borderRadius: StyleGuide.spacing.xs,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: StyleGuide.spacing.sm,
    justifyContent: "space-between",
  },
  countryInfoContainer: {
    marginRight: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  capital: {
    fontSize: 10,
    color: "grey",
  },
  currency: {
    fontSize: 10,
  },
  populationContainer: {
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 2,
  },
  section: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default memo(CountryCard);
