import {Dimensions} from "react-native";
// import { StackNavigationOptions } from "@react-navigation/stack";
// import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const DEVICE_WIDTH = Dimensions.get("window").width;

// export const HEADER_HEIGHT = DEVICE_HEIGHT * 0.12;

// export const BOTTOM_TAB_HEIGHT = 64;
// export const BOTTOM_TAB_ICON_SIZE = 24;

// export const INPUT_HEIGHT = 45;
// export const ACTIVE_OPACITY = 0.8;

// export enum FONTS {
//     CircularStdBlack = "CircularStd-Black",
//     CircularStdBlackItalic = "CircularStd-BlackItalic",
//     CircularStdBold = "CircularStd-Bold",
//     CircularStdBoldItalic = "CircularStd-BoldItalic",
//     CircularStdBook = "CircularStd-Book",
//     CircularStdBookItalic = "CircularStd-BookItalic",
//     CircularStdMedium = "CircularStd-Medium",
//     CircularStdMediumItalic = "CircularStd-MediumItalic",
// }

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
