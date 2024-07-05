import React from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "tamagui";
import { VictoryPie, VictoryContainer } from "victory-native";

export default function App() {
  const data = [
    { x: "Category A", y: 35 },
    { x: "Category B", y: 40 },
    { x: "Category C", y: 75 }
  ];

  return (
    <View style={styles.container}>
      <Stack>
        <VictoryPie
          data={data}
          colorScale={["tomato", "gold", "cyan"]}
          height={320}
          style={{
            labels: { fontSize: 16, fill: "white" }
          }}
          animate={{
            duration: 800
          }}
          //   padAngle={({ datum }) => datum.y}
          innerRadius={80}
          // labels={({ datum }) => datum.label}
          labelPosition="endAngle"
          labelRadius={({ innerRadius }) => innerRadius + 50}
        />
      </Stack>
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
