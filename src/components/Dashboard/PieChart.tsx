import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ScrollView, Stack, Text, View, XStack } from "tamagui";
import {
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer
} from "victory-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function App() {
  const { width, height } = Dimensions.get("window");
  const data = [
    { x: "A", y: 50, label: "Slice A" },
    { x: "B", y: 30, label: "Slice B" },
    { x: "C", y: 20, label: "Slice C" },
    { x: "D", y: 10, label: "Slice D" },
    { x: "E", y: 5, label: "Slice E" },
    { x: "F", y: 12, label: "Slice F" },
    { x: "G", y: 22, label: "Slice G" }
  ];
  const [selectedSlice, setSelectedSlice] = useState(null);

  const handleSlicePress = (event: any, data: any) => {
    setSelectedSlice(data.x);
  };
  const dataCount: number = data.length;

  const colors = ["limegreen", "gold", "cyan", "pink"];
  return (
    <>
      <View style={styles.container}>
        <VictoryPie
          data={data}
          colorScale={["limegreen", "gold", "cyan", "pink"]}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: (event, props) => {
                  const { datum } = props;
                  handleSlicePress(event, datum);
                  return [];
                }
              }
            }
          ]}
          height={250} // Adjust height to fit the chart
          padding={{ top: 15, bottom: 15 }}
          style={{
            data: {
              fill: ({ datum }) =>
                datum.x === selectedSlice ? "orange" : "blue",
              strokeWidth: ({ datum }) => (datum.x === selectedSlice ? 4 : 1),
              stroke: "white"
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
      {/* <ScrollView horizontal> */}
        <Stack mx={'auto'} flexWrap="wrap" jc={'center'} flexDirection="row">
        {data.map((ele, ind) => (
          <XStack key={ind} ai={"center"} >
            <Entypo name="dot-single" size={24} color="white" />
            <Text>{ele.label}</Text>
          </XStack>
        ))}
        </Stack>
        {/* </ScrollView> */}
      
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
