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
      {data.length > 0 ? (
        data.map(
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
                  <XStack ai="center">
                    <Text
                      fontFamily={"$medium"}
                      fontSize={"$2"}
                      color={
                        ele.type === "income"
                          ? COLORS.primary
                          : COLORS.prime_red
                      }
                    >
                      {ele.type === "income" ? "+" : "-"}
                    </Text>
                    <Text
                      fontFamily={"$medium"}
                      fontSize={"$4"}
                      color={
                        ele.type === "income"
                          ? COLORS.primary
                          : COLORS.prime_red
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
        )
      ) : (
        <Stack mt={30} jc="center" ai="center">
          <Text fontSize={"$4"} color={COLORS.neutral_text}>
            No Transactions made
          </Text>
        </Stack>
      )}
    </YStack>
  );
}
