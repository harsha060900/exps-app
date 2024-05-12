// Package
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { XStack } from "tamagui";
// Icons
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants";
// Components and Screens
import ExpenseScreen from "../screens/ExpenseScreen";

export default function HomeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Add Expense",
          headerStyle: {
            backgroundColor: COLORS.bg
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "JostSemiBold"
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
      <XStack px={22} flex={1} bg={COLORS.bg}>
        <ExpenseScreen />
      </XStack>
    </>
  );
}
