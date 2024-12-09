import React, { useEffect, useState } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory-native";
// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
// constants
import { COLORS } from "@/src/constants";
// other
import moment from "moment";

export default function AreaChart() {
  return (
    <View ai={"center"}>
      <VictoryChart
        style={{
          parent: {},
          background: {
            fill: "green"
            // fill: COLORS.bg
          }
        }}
      >
        {/* X-Axis */}
        <VictoryAxis
          style={{
            parent: {
              fill: "red",
              background: "red"
            },
            axis: { stroke: COLORS.blur_border, strokeWidth: 0 }, // Axis line color and thickness
            //ticks: { stroke: COLORS.blur_border, size: 5 }, // Tick mark size and color
            tickLabels: {
              fill: COLORS.blur_border, // Text color for labels
              fontSize: 12 // Font size for labels
              // Padding between labels and axis
            }
          }}
        />
        {/* Y-Axis */}
        <VictoryAxis
          dependentAxis //for y-axis
          style={{
            axis: { stroke: COLORS.blur_border, strokeWidth: 0 }, // Axis line color and thickness
            //ticks: { stroke: COLORS.blur_border, size: 5 }, // Tick mark size and color
            tickLabels: {
              fill: COLORS.blur_border, // Text color for labels
              fontSize: 12 // Font size for labels
              // Padding between labels and axis
            },
            grid: {
              stroke: COLORS.card_bg
            }
          }}
        />
        <VictoryArea
          data={[
            { x: "2024-06-06", y: 5 },
            { x: "2024-10-15", y: 10 },
            { x: "2024-10-16", y: 11 },
            { x: "2024-10-17", y: 20 },
            { x: "2024-10-18", y: 25 },
            { x: "2024-11-22", y: 28 }
          ]}
          x={(d) => moment(d.x).format("DD MMM")}
          style={{
            data: {
              fill: "#f57848",
              opacity: 0.4,
              stroke: "#f57848",
              strokeWidth: 2
            }
          }}
          interpolation="natural"
        />
      </VictoryChart>
    </View>
  );
}
