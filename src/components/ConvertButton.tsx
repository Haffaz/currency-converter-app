import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ConvertButtonProps = {
  onPress: () => void;
  isLoading: boolean;
};

const ConvertButton = ({ isLoading, onPress }: ConvertButtonProps) => (
  <TouchableOpacity {...{ onPress }} activeOpacity={0.7}>
    <View style={styles.button}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MaterialIcons name="sync-alt" size={24} color="black" />
      )}
    </View>
  </TouchableOpacity>
);

const BUTTON_RADIUS = 45;

const styles = StyleSheet.create({
  button: {
    height: BUTTON_RADIUS,
    width: BUTTON_RADIUS,
    borderRadius: BUTTON_RADIUS / 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConvertButton;
