import React from "react";
import { StyleSheet, View } from "react-native";
import StyleGuide from "../styles/StyleGuide";

const VerticalItemSeparator = () => <View style={styles.separator} />;

export const VERTICAL_SEPARATOR_HEIGHT = StyleGuide.spacing.md;

const styles = StyleSheet.create({
  separator: {
    height: VERTICAL_SEPARATOR_HEIGHT,
  },
});

export default VerticalItemSeparator;
