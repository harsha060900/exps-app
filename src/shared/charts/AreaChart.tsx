import React, { useEffect, useState } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
import { VictoryChart, VictoryArea } from "victory-native";
// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
// constants
import { COLORS } from "@/src/constants";
// other
import moment from "moment";

export default function AreaChart() {
  return (
    <VictoryChart>
      <VictoryArea
        data={[
          { x: "2024-06-06", y: 2 },
          { x: "2024-10-15", y: 3 },
          { x: "2024-10-16", y: 5 },
          { x: "2024-10-17", y: 4 },
          { x: "2024-10-18", y: 7 }
        ]}
        x={(d) => moment(d).format("MMM-DD")}
        style={{
          data: {
            fill: "#f57848",
            fillOpacity: 0.4,
            stroke: "#f57848",
            strokeWidth: 2
          },
          labels: {
            fontSize: 12,
            fill: "#fff"
          }
        }}
        interpolation="natural"
      />
    </VictoryChart>
  );
}
