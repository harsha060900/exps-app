import { COLORS } from "@/src/constants";
import HomeScreen from "@/src/screens/HomeScreen";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack } from "tamagui";

export default function HomeIndex() {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg, position:'relative' }}>
        <XStack px={20} flex={1}>
          <HomeScreen />
        </XStack>
      </SafeAreaView>
    </>
  );
}
