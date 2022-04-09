import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountriesPage from "../pages/CountriesPage";
import { NavigationContainer } from "@react-navigation/native";
import RatesPage from "../pages/RatesPage";
import { CountryBasicInfo } from "../types";

export type RootStackParams = {
  Countries: undefined;
  Rates: { country: CountryBasicInfo };
};

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Countries">
      <Stack.Screen name="Countries" component={CountriesPage} />
      <Stack.Screen name="Rates" component={RatesPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootStack;
