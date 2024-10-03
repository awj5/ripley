import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Device from "expo-device";
import { theme } from "../utils/helpers";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colors = theme();

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Chronicle-Display-Bold": require("../assets/fonts/Chronicle-Display-Bold.ttf"),
    "Chronicle-Display-Italic": require("../assets/fonts/Chronicle-Display-Italic.ttf"),
    "Chronicle-Display-Roman": require("../assets/fonts/Chronicle-Display-Roman.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  const changeScreenOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };

  if (Device.deviceType === 2) changeScreenOrientation(); // Allow landscape on tablets
  if (!fontsLoaded && !fontError) return null; // Show splash until fonts ready

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors.primaryBg,
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.primaryBg,
        },
        headerTintColor: colors.primary,
      }}
    />
  );
}
