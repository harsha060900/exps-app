import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack, Text } from "tamagui";
import {
  VictoryPie,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer
} from "victory-native";

export default function App() {
  const data = [
    { x: "A", y: 50, label: "Slice A" },
    { x: "B", y: 30, label: "Slice B" },
    { x: "C", y: 20, label: "Slice C" },
    { x: "D", y: 10, label: "Slice D" }
  ];
  const [selectedSlice, setSelectedSlice] = useState(null);

  const handleSlicePress = (event, data) => {
    setSelectedSlice(data.x);
  };
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
        style={{
          data: {
            fill: ({ datum }) =>
              datum.x === selectedSlice ? "orange" : "blue",
            strokeWidth: ({ datum }) => (datum.x === selectedSlice ? 4 : 1),
            stroke: "white"
            // Apply scaling effect through the radius
            // Scale the selected slice
          }
        }}
        animate={{
          duration: 300,
          onExit: {
            duration: 300
          }
        }}
        innerRadius={100} // Optional: Add inner radius for a donut effect
      />

      {/* </Stack> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#f5fcff"
  }
});
