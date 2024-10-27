import React, { useEffect, useState } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
import { VictoryPie } from "victory-native";
// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
// constants
import { COLORS } from "@/src/constants";

export default function PieChart({
  data,
  filter = ""
}: {
  data: { data: []; totExp: number };
  filter: string;
}) {
  const [selectedSlice, setSelectedSlice] = useState({
    id: null,
    name: "",
    exp: null
  });
  useEffect(() => {
    setSelectedSlice({
      id: null,
      name: "",
      exp: null
    });
  }, [filter]);

  const handleSlicePress = (item: any) => {
    if (selectedSlice.id === item.cateId) {
      setSelectedSlice({ id: null, name: "", exp: null });
      return;
    }
    setSelectedSlice({
      id: item.cateId,
      name: item.cateName,
      exp: item.expense
    });
  };
  return (
    <>
      {data?.data.length > 0 ? (
        <>
          <View ai={"center"} jc="center" pos={"relative"}>
            {/* SELECTED SLICE TOTAL  */}
            <YStack pos={"absolute"} ai="center">
              <Text
                textTransform="capitalize"
                fontSize={"$4"}
                fontFamily={"$subHead"}
              >
                {selectedSlice.name ? selectedSlice.name : "All"}
              </Text>
              <XStack ai="center">
                <MaterialCommunityIcons
                  name="currency-inr"
                  size={15}
                  color={COLORS.prime_text}
                />
                <Text color={COLORS.prime_text} fontSize={"$3"}>
                  {selectedSlice.exp ? selectedSlice.exp : data.totExp}
                </Text>
              </XStack>
            </YStack>
            <VictoryPie
              data={data.data}
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
            {data?.data?.map((ele, ind) => (
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
        <Stack h={250} jc="center" ai="center">
          <Text fontSize={"$4"} color={COLORS.neutral_text}>
            No Transactions made
          </Text>
        </Stack>
      )}
    </>
  );
}
