// import { COLORS } from "@/src/constants";
// import { Redirect, Stack } from "expo-router";

// export default function IndexLayout() {
//   return <Redirect href={"/(main)/home"} />;
// }

import { COLORS } from "@/src/constants";
import HomeScreen from "@/src/screens/HomeScreen";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.bg, position: "relative" }}
      >
        <XStack flex={1}>
          <HomeScreen />
        </XStack>
      </SafeAreaView>
    </>
  );
}
