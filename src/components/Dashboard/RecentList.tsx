import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, Stack, View, Button } from "tamagui";
// icons
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5
} from "@expo/vector-icons";
//styles
import { COLORS } from "@/src/constants";
import moment from "moment";

export default function RecentList({ data }) {
  return (
    <YStack>
      <XStack jc={"space-between"} ai={"center"}>
        <Text fontSize={"$5"} fontFamily={"$medium"} mb={8}>
          Recent Expenses
        </Text>
        <View>
          <Text
            color={COLORS.primary}
            fontFamily={"$medium"}
            textDecorationLine="underline"
          >
            Show all
          </Text>
        </View>
      </XStack>
      {data.map((ele, ind) => (
        <XStack
          bg={"#ffffff10"}
          borderRadius={8}
          key={ind}
          my={5}
          py={8}
          pr={12}
          pl={8}
          jc={"space-between"}
        >
          <YStack>
            <XStack ai="center">
              <MaterialCommunityIcons
                name="currency-inr"
                size={15}
                color={COLORS.icon}
              />
              <Text ml={2} fontFamily={"$medium"} fontSize={"$4"}>
                {ele.amt}
              </Text>
            </XStack>
            <Text ml={4} color={COLORS.neutral_text}>
              {moment(ele.created).format("MMMM DD")}
            </Text>
          </YStack>
          <YStack ai="flex-end">
            <Text fontFamily={"$medium"} fontSize={"$3"}>
              {ele.cateName}
            </Text>
            <Text color={COLORS.neutral_text}>{ele.subCateName}</Text>
          </YStack>
        </XStack>
      ))}
    </YStack>
  );
}
