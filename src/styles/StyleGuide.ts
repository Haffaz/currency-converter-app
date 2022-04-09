import { Dimensions } from "react-native";

export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_WIDTH = Dimensions.get("window").width;

export enum FONTS {
  Roboto_100Thin = "Roboto_100Thin",
  Roboto_300Light = "Roboto_300Light",
  Roboto_400Regular = "Roboto_400Regular",
  Roboto_500Medium = "Roboto_500Medium",
  Roboto_700Bold = "Roboto_700Bold",
  Roboto_900Black = "Roboto_900Black",
}

const StyleGuide = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
  },
  palette: {
    primary: "#119AB5",
    secondary: "#4DA627",
  },
};

// export const StackHeaderStyles: StackNavigationOptions = {
//     headerTitleAlign: "center",
//     headerBackTitleVisible: false,
//     headerLeftContainerStyle: {
//         marginLeft: StyleGuide.spacing.md,
//     },
//     headerRightContainerStyle: {
//         marginRight: StyleGuide.spacing.md,
//     },
//     headerStyle: {
//         backgroundColor: StyleGuide.palette.primary,
//         elevation: 0,
//         shadowColor: "transparent",
//     },
//     headerTintColor: "white",
// };

export default StyleGuide;
