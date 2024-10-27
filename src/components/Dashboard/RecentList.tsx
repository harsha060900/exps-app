import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, Stack, View, Button } from "tamagui";
import moment from "moment";
// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
//styles
import { COLORS } from "@/src/constants";
import { router } from "expo-router";

export default function RecentList({ data }) {  
  return (
    <YStack mt={20}>
      <XStack jc={"space-between"} ai={"center"}>
        <Text fontSize={"$5"} fontFamily={"$medium"} mb={8}>
          Recent Transactions
        </Text>
        <View onPress={() => router.push("/transactions")}>
          <Text
            color={COLORS.primary}
            fontFamily={"$medium"}
            textDecorationLine="underline"
          >
            Show all
          </Text>
        </View>
      </XStack>
      {data.map(
        (ele, ind) =>
          ind < 4 && (
            <XStack
              bg={COLORS.card_bg}
              borderRadius={8}
              key={ind}
              my={5}
              py={8}
              pr={12}
              pl={8}
              jc={"space-between"}
            >
              <XStack gap={6}>
                {/* <View
                  position="relative"
                  mr={3}
                  bg={
                    ele.type === "income"
                      ? COLORS.primary_lite
                      : COLORS.error_lite
                  }
                  px={10}
                  py={5}
                  borderRadius={15}
                >
                  <FontAwesome5
                    name="money-bill-alt"
                    style={{ marginTop: 11 }}
                    size={24}
                    color={
                      ele.type === "income" ? COLORS.primary : COLORS.prime_red
                    }
                  />
                  <Feather
                    style={{ position: "absolute", top: 0, left: 14 }}
                    name={
                      `trending-${
                        ele.type === "income" ? "down" : "up"
                      }` as keyof object
                    }
                    size={21}
                    color={
                      ele.type === "income" ? COLORS.primary : COLORS.prime_red
                    }
                  />
                </View> */}

                <XStack ai="center">
                  <Text
                    fontFamily={"$medium"}
                    fontSize={"$2"}
                    color={
                      ele.type === "income" ? COLORS.primary : COLORS.prime_red
                    }
                  >
                    {ele.type === "income" ? "+" : "-"}
                  </Text>
                  <Text
                    fontFamily={"$medium"}
                    fontSize={"$4"}
                    color={
                      ele.type === "income" ? COLORS.primary : COLORS.prime_red
                    }
                  >
                    <MaterialCommunityIcons
                      name="currency-inr"
                      size={16}
                      // color={COLORS.icon}
                      color={
                        ele.type === "income"
                          ? COLORS.primary
                          : COLORS.prime_red
                      }
                    />
                    {ele.amt}
                  </Text>
                </XStack>
              </XStack>

              <YStack ai="flex-end" jc="center">
                <Text ml={4} fontSize={"$3"}>
                  {moment(ele.period).format("DD MMM YY")}
                </Text>
                {ele.cateName && (
                  <XStack ai={"center"}>
                    <Text
                      color={COLORS.neutral_text}
                      fontFamily={"$medium"}
                      fontSize={"$2"}
                    >
                      {ele.cateName}
                    </Text>
                    {ele.subCateName && (
                      <Text color={COLORS.neutral_text} fontSize={"$2"}>
                        {" -->"} {ele.subCateName}
                      </Text>
                    )}
                  </XStack>
                )}
              </YStack>
            </XStack>
          )
      )}
    </YStack>
  );
}
