import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Stack, Text, View } from "tamagui";
import {
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer
} from "victory-native";

export default function App() {
  const data = [
    { x: "A", y: 50, label: "Slice A" },
    { x: "B", y: 30, label: "Slice B" }
    // { x: "C", y: 20, label: "Slice C" },
    // { x: "D", y: 10, label: "Slice D" }
  ];
  const [selectedSlice, setSelectedSlice] = useState(null);

  const handleSlicePress = (event, data) => {
    setSelectedSlice(data.x);
  };

  const colors = ["limegreen", "gold", "cyan", "pink"];
  return (
    <View style={styles.container}>
      {/* <Stack> */}
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
        height={320} // Adjust height to fit the chart
        padding={{ top: 15, bottom: 15 }}
        style={{
          data: {
            fill: ({ datum }) =>
              datum.x === selectedSlice ? "orange" : "blue",
            strokeWidth: ({ datum }) => (datum.x === selectedSlice ? 4 : 1),
            stroke: "white"
            // Apply scaling effect through the radius
            // Scale the selected slice
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
        innerRadius={100} // Optional: Add inner radius for a donut effect
      />
      <VictoryLegend
        x={50}
        // y={50}
        height={50}
        // padding={{ top: 10, bottom: 10 }}
        orientation="horizontal"
        gutter={20}
        style={{
          labels: { fontSize: 14, fill: "#fff" },
          parent: {
            backgroundColor: "limegreen"
          }
        }}
        colorScale={colors}
        data={data.map((x) => ({ name: x.label }))}
      />
      {/* </Stack> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#f5fcff"
  }
});
