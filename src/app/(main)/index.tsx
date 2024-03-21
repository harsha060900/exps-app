import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, XStack } from "tamagui";

export default function HomeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#191919"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          headerShadowVisible: false
        }}
      />
      <XStack bg={"#191919"} flex={1}>
        <Text fontFamily={"$semiBold"} fontSize={"$6"} color="#fff">
          Hello
        </Text>
      </XStack>
    </>
  );
}
