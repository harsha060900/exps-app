// Package
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
// Icons
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants";
// Components and Screens
import HomeScreen from "@/src/screens/HomeScreen";
import CreateScreen from "../screens/CreateScreen";

export default function HomeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Category",
          headerStyle: {
            backgroundColor: COLORS.bg
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          headerShadowVisible: false,
          headerLeft: (props) => (
            <Ionicons
              name="chevron-back"
              style={{ marginRight: 25 }}
              size={24}
              color="#fff"
              onPress={() => router.back()}
            />
          )
        }}
      />
      <XStack px={20} flex={1} bg={COLORS.bg}>
        <CreateScreen />
      </XStack>
    </>
  );
}
