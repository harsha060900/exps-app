import { COLORS } from "@/src/constants";
import HomeScreen from "@/src/screens/HomeScreen";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack } from "tamagui";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
      name="index"
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
      />
    </Stack>
  );
}
