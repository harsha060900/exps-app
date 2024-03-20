import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, XStack } from "tamagui";

export default function HomeLayout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "red"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
      <XStack>
        <Text style={{ fontFamily: "JostBold", fontWeight: "700" }}>Hello</Text>
      </XStack>
    </>
  );
}
