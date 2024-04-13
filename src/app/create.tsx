import { COLORS } from "@/src/constants";
import HomeScreen from "@/src/screens/HomeScreen";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack } from "tamagui";
import CreateScreen from "../screens/CreateScreen";

export default function HomeLayout() {
  return (
    <>
      {/* <Stack.Screen
      name="create"
        options={{
            headerStyle: {
                backgroundColor: COLORS.bg,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShadowVisible: false,
            headerShown: false,
        }}
      /> */}
      <CreateScreen />
    </>
  );
}
