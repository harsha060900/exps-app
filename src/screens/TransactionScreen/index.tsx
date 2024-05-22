import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, View, Button, Separator } from "tamagui";
import { Stack, router } from "expo-router";
import moment from "moment";
// icons
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  FontAwesome
} from "@expo/vector-icons";
//styels
import { COLORS } from "@/src/constants";
// redux
import { useGetExpenseQuery } from "@/src/store/services/expenseApi";
import SharedSpinner from "@/src/shared/SharedSpinner";
import SharedFAB from "@/src/shared/SharedFAB";

export default function TransactionScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({ orderBy: "desc" });
  const { data, isFetching } = useGetExpenseQuery(searchParams);

  console.log("data:", data.data.length);

  function Action() {
    return (
      <XStack gap={8}>
        <View>
          <MaterialCommunityIcons name="pencil" size={20} color={COLORS.warn} />
        </View>
        <Separator borderRightColor={COLORS.blur_border} vertical />

        <View>
          <FontAwesome name="trash" size={20} color={COLORS.prime_red} />
        </View>
      </XStack>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Transactions",
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.bg
          },
          headerTintColor: COLORS.prime_text,
          headerTitleStyle: {
            fontFamily: "JostSemiBold"
          },
          headerShadowVisible: false
        }}
      />
      <YStack mt={10} flex={1} gap={20}>
        {isFetching ? (
          <SharedSpinner />
        ) : data.data.length === 0 ? (
          <XStack flex={1} jc={"center"} ai={"center"}>
            <Text fontSize={"$4"} color={COLORS.neutral_text}>
              No transactions made
            </Text>
          </XStack>
        ) : (
          data?.data?.map((ele, ind) => (
            <XStack
              bg={"#ffffff10"}
              borderRadius={8}
              // mb={10}
              py={8}
              pr={12}
              pl={8}
              jc={"space-between"}
              key={ind}
            >
              <YStack gap={8}>
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
                {/* cate and sub cate */}
                <XStack ai={"center"} ml={18}>
                  <Text
                    textTransform="capitalize"
                    color={COLORS.neutral_text}
                    fontFamily={"$medium"}
                    fontSize={"$2"}
                  >
                    {ele.cateName}
                  </Text>
                  {ele.subCateName && (
                    <Text
                      textTransform="capitalize"
                      color={COLORS.neutral_text}
                      fontSize={"$2"}
                    >
                      {" -->"} {ele.subCateName}
                    </Text>
                  )}
                </XStack>
              </YStack>

              <YStack ai="flex-end" gap={8}>
                <Text ml={4} fontSize={"$3"}>
                  {moment(ele.created).format("MMMM DD")}
                </Text>
                <Action />
              </YStack>
            </XStack>
          ))
        )}
      </YStack>
      <SharedFAB open={fabOpen} onStateChange={(data) => setFabOpen(data)} />
    </>
  );
}
