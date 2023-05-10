import { DefaultTheme } from "@react-navigation/native";
import { Colors } from "../shared/colors";

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.offWhite,
  }
}