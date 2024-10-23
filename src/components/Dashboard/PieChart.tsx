import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ScrollView, Stack, Text, View, XStack, YStack } from "tamagui";
import {
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer
} from "victory-native";
import Entypo from "@expo/vector-icons/Entypo";

// redux
import { useGetPieChartQuery } from "@/src/store/services/chartApi";
import SharedSpinner from "@/src/shared/SharedSpinner";

import moment from "moment";
import { COLORS } from "@/src/constants";
// icons
import {
  MaterialCommunityIcons
} from "@expo/vector-icons";

export default function App() {
  const [searchParams, setSearchParams] = useState({
    filterBy: "",
    // start:'2024-05-01',
    // end:'2024-05-30'
    start: moment().startOf("month").format("YYYY-MM-DD"),
    end: moment().endOf("month").format("YYYY-MM-DD")
  });
  const { data, isFetching } = useGetPieChartQuery(searchParams);

  const { width, height } = Dimensions.get("window");
  // const data = [
  //   { x: "A", y: 50, label: "Slice A" },
  //   { x: "B", y: 30, label: "Slice B" },
  //   { x: "C", y: 20, label: "Slice C" },
  //   { x: "D", y: 10, label: "Slice D" },
  //   { x: "E", y: 5, label: "Slice E" },
  //   { x: "F", y: 12, label: "Slice F" },
  //   { x: "G", y: 22, label: "Slice G" }
  // ];
  const [selectedSlice, setSelectedSlice] = useState({
    id: null,
    name: "",
    exp: null
  });

  const handleSlicePress = (data: any) => {
    if (selectedSlice.id === data.cateId) {
      setSelectedSlice({ id: null, name: "", exp: null });
      return;
    }
    setSelectedSlice({
      id: data.cateId,
      name: data.cateName,
      exp: data.expense
    });
  };

  const colors = ["limegreen", "gold", "cyan", "pink"];
  return (
    <>
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
      {isFetching ? (
        <SharedSpinner />
      ) : data.length > 0 ? (
        <>
          <View style={styles.container} jc="center" pos={"relative"}>
            <YStack pos={"absolute"} ai="center">
              <Text
                textTransform="capitalize"
                fontSize={"$4"}
                fontFamily={"$subHead"}
              >
                {selectedSlice.name}
              </Text>
              <XStack ai='center'>
                {
                  selectedSlice.id &&
              <MaterialCommunityIcons
              name="currency-inr"
              size={15}
              color={COLORS.prime_text}
              />
            }
              <Text color={COLORS.prime_text} fontSize={"$3"}>{selectedSlice.exp}</Text>
              </XStack>
            </YStack>
            <VictoryPie
              data={data}
              x="cateId"
              y="expense"
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: (event, props) => {
                      const { datum } = props;
                      handleSlicePress(datum);
                      return [];
                    }
                  }
                }
              ]}
              height={250} // Adjust height to fit the chart
              padding={{ top: 15, bottom: 15 }}
              style={{
                data: {
                  fill: ({ datum }) => datum.bgColor,
                  strokeWidth: ({ datum }) =>
                    datum.cateId === selectedSlice.id ? 3 : 0,
                  stroke: ({ datum }) => datum.bgColor
                },
                labels: { display: "none" },
                parent: {
                  // backgroundColor: "red"
                }
              }}
              animate={{
                duration: 200,
                onLoad: { duration: 500 },
                easing: "bounce"
              }}
              innerRadius={75}
            />
          </View>
          {/* chart legend */}
          <Stack mx={"auto"} flexWrap="wrap" jc={"center"} flexDirection="row">
            {data.map((ele, ind) => (
              <XStack
                key={ind}
                ai={"center"}
                mr={15}
                onPress={() => handleSlicePress(ele)}
              >
                <View
                  bg={ele.bgColor}
                  mr={4}
                  w={8}
                  h={8}
                  borderRadius={50}
                ></View>
                {/* <Entypo name="dot-single" size={28} color={ele.bgColor} /> */}
                <Text>{ele.cateName}</Text>
              </XStack>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Stack h={250} jc="center" ai="center">
            <Text fontSize={"$4"} color={COLORS.neutral_text}>
              No Transactions made
            </Text>
          </Stack>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#f5fcff"
  }
});
