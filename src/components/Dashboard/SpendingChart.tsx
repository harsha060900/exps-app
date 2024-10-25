import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Stack, Text, View, XStack, YStack } from "tamagui";
// redux
import { useGetPieChartQuery } from "@/src/store/services/chartApi";

import moment from "moment";
import { COLORS } from "@/src/constants";
// icons
// components
import SharedSpinner from "@/src/shared/SharedSpinner";
import PieChart from "@/src/shared/charts/PieChart";

export default function SpendingChart() {
  const [searchParams, setSearchParams] = useState({
    filterBy: "",
    // start:'2024-05-01',
    // end:'2024-05-30'
    start: moment().startOf("month").format("YYYY-MM-DD"),
    end: moment().endOf("month").format("YYYY-MM-DD")
  });
  const { data, isFetching } = useGetPieChartQuery(searchParams);

  // const data = [
  //   { x: "A", y: 50, label: "Slice A" },
  //   { x: "B", y: 30, label: "Slice B" },
  //   { x: "C", y: 20, label: "Slice C" },
  //   { x: "D", y: 10, label: "Slice D" },
  //   { x: "E", y: 5, label: "Slice E" },
  //   { x: "F", y: 12, label: "Slice F" },
  //   { x: "G", y: 22, label: "Slice G" }
  // ];

  return (
    <>
      <Text fontSize={"$7"} fontFamily={"$heading"} mb={2}>
        Spending
      </Text>
      <XStack jc={"space-between"} ai={"center"}>
        <Text fontSize={"$5"} fontFamily={"$medium"} mb={8}>
          This Month
        </Text>
        <View onPress={() => {}}>
          <Text
            color={COLORS.primary}
            fontFamily={"$medium"}
            textDecorationLine="underline"
          >
            Show all
          </Text>
        </View>
      </XStack>
      {isFetching ? <SharedSpinner /> : <PieChart data={data} filter={false} />}
    </>
  );
}

const styles = StyleSheet.create({});
