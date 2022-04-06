import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountriesPage from "../pages/CountriesPage";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParams = {
  Countries: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Countries" component={CountriesPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootStack;
