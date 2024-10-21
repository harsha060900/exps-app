import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, Stack, View, Button, ScrollView } from "tamagui";
import { router } from "expo-router";
// icons
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5
} from "@expo/vector-icons";
//styels
import { COLORS } from "@/src/constants";
// components
import SharedFAB from "@/src/shared/SharedFAB";
import RecentList from "@/src/components/Dashboard/RecentList";
import SharedSpinner from "@/src/shared/SharedSpinner";
// redux
import { useGetExpenseQuery } from "@/src/store/services/expenseApi";
import HomePieChart from "@/src/components/Dashboard/PieChart";

export default function HomeScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    orderBy: "desc",
    start: "",
    end: ""
  });
  const { data, isFetching } = useGetExpenseQuery(searchParams);

  return (
    <YStack flex={1} px={20} pt={20}>
      {isFetching ? (
        <SharedSpinner />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* AVAL BALANCE */}
          <YStack ai="center">
            <Text ff={"$subHead"} ml={10}>
              Available Balance
            </Text>
            <XStack ai={"center"}>
              <MaterialCommunityIcons
                name="currency-inr"
                size={34}
                color={COLORS.prime_text}
              />
              <Text ff={"$bold"} fontSize={"$14"}>
                {data?.balance}
              </Text>
            </XStack>
          </YStack>
          {/* INCOME EXPENSE CARD */}
          <XStack mt={20} jc="space-between" mb={25}>
            <IncomeExpenseCard
              title="Income"
              amt={data?.totInc}
              icon="down"
              mr={10}
              color={COLORS.green1}
            />
            <IncomeExpenseCard
              title="Expense"
              amt={data?.totExp}
              icon="up"
              ml={10}
              color={COLORS.prime_red}
            />
          </XStack>
          {/* Charts */}
          <HomePieChart />
          {/* Recent List */}
          <RecentList data={data.data} />
          <SharedFAB
            open={fabOpen}
            onStateChange={(data) => setFabOpen(data)}
          />
        </ScrollView>
      )}
    </YStack>
  );
}

function IncomeExpenseCard({ title, amt, icon, mr = 0, ml = 0, color }: any) {
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
      <View
        position="relative"
        mr={3}
        bg={"#fff"}
        px={10}
        py={5}
        borderRadius={15}
      >
        <FontAwesome5
          name="money-bill-alt"
          style={{ marginTop: 11 }}
          size={24}
          color={color}
        />
        <Feather
          style={{ position: "absolute", top: 0, left: 14 }}
          name={`trending-${icon}` as keyof object}
          size={21}
          color={color}
        />
      </View>
      <YStack>
        <Text ml={6} ff={"$subHead"} color="#fff">
          {title}
        </Text>
        <XStack ai={"center"}>
          <MaterialCommunityIcons name="currency-inr" size={24} color="#fff" />
          <Text ff={"$medium"} fontSize={"$7"} color={"#fff"}>
            {amt}
          </Text>
        </XStack>
      </YStack>
    </XStack>
  );
}
