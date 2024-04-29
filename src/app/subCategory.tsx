// Package
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
// Icons
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants";
import SubCategoryScreen from "@/src/screens/SubCategoryScreen";
// Components and Screens

export default function HomeLayout() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Sub Category",
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
          ),
          headerRight: (props) => (
            <Ionicons
              name="add"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                padding: 8,
                marginRight: 5
              }}
              size={20}
              color={"#fff"}
              onPress={() => setDialogOpen(true)}
            />
          )
        }}
      />
      <XStack px={20} flex={1} bg={COLORS.bg}>
        <SubCategoryScreen />
      </XStack>
    </>
  );
}
