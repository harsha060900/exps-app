import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, Stack, View, Button } from "tamagui";
// icons
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { COLORS } from "@/src/constants";
import { router } from "expo-router";

export default function CreateScreen() {
  return (
    <YStack flex={1}>
      {/* AVAL BALANCE */}
      <YStack ai="center">
        <Text ff={"$subHead"} ml={10}>Available Balance</Text>
        <XStack ai={"center"}>
          <MaterialCommunityIcons name="currency-inr" size={34} color="#fff" />
          <Text ff={"$bold"} fontSize={"$14"}>
            1987
          </Text>
        </XStack>
      </YStack>
      </YStack>
  );
}

