import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, Stack, View } from "tamagui";
// icons
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { COLORS } from "@/src/constants";

export default function HomeScreen() {
  return (
    <YStack flex={1}>
      {/* AVAL BALANCE */}
      <YStack ai="center">
        <Text ff={"$subHead"}>Aval Balance</Text>
        <XStack ai={"center"}>
          <MaterialCommunityIcons name="currency-inr" size={34} color="#fff" />
          <Text ff={"$bold"} fontSize={"$14"}>
            1987
          </Text>
        </XStack>
      </YStack>
      {/* INCOME EXPENSE CARD */}
      <XStack mt={20} jc="space-between">
        <IncomeExpenseCard
          title="Income"
          amt={98760}
          icon="up"
          mr={10}
          color={COLORS.prime_green}
        />
        <IncomeExpenseCard
          title="Expense"
          amt={5000}
          icon="down"
          ml={10}
          color={COLORS.prime_red}
        />
      </XStack>
    </YStack>
  );
}

function IncomeExpenseCard({ title, amt, icon, mr = 0, ml = 0, color }) {
  return (
    <XStack
      bg={color}
      ai={"center"}
      px={12}
      py={10}
      borderRadius={15}
      flex={1}
      mr={mr}
      ml={ml}
    >
      <View position="relative" mr={3} bg={'#fff'} px={10} py={5} borderRadius={15}>
        <FontAwesome5 name="money-bill-alt" style={{marginTop:11}} size={24} color={color} />
        <Feather
          style={{ position: "absolute", top: 0, left:14 }}
          name={`trending-${icon}`}
          size={21}
          color={color}
        />
      </View>
      <YStack>
        <Text ml={6} ff={"$subHead"}>{title}</Text>
        <XStack ai={"center"}>
          <MaterialCommunityIcons name="currency-inr" size={24} color="#fff" />
          <Text ff={"$medium"} fontSize={"$7"}>
            {amt}
          </Text>
        </XStack>
      </YStack>
    </XStack>
  );
}
