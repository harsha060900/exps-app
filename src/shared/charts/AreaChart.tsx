import React, { useEffect, useState } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryTheme,
  VictoryPortal,
  VictoryLabel
} from "victory-native";
// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
// constants
import { COLORS } from "@/src/constants";
// other
import moment from "moment";

export default function StatAreaChart() {
  const sampleData = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 6 }
  ];

  return (
    <View ai={"center"} style={{ flex: 1, width: 300, height: 200 }}>
      <VictoryChart
        domain={{ x: [0, 10], y: [0, 10] }}
        width={400}
        height={300}
        padding={{ top: 50, bottom: 50, right: 40, left: 50 }}
        style={{
          background: {
            fill: "transparent"
          }
        }}
      >
        {/* X-Axis */}
        <VictoryAxis
          style={{
            parent: {},
            axis: {
              stroke: COLORS.blur_border,
              strokeWidth: 0,
              paddingRight: 0
            }, // Axis line color and thickness
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
        <VictoryVoronoiContainer>
          <VictoryArea
            labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "white", stroke: "black" }}
                pointerWidth={10}
                renderInPortal={false}
              />
            }
            // data={[
            //   { x: "2024-06-06", y: 5 },
            //   { x: "2024-10-15", y: 10 },
            //   { x: "2024-10-16", y: 11 },
            //   { x: "2024-10-17", y: 20 },
            //   { x: "2024-10-18", y: 25 },
            //   { x: "2024-11-22", y: 28 }
            // ]}
            data={sampleData}
            // x={(d) => moment(d.x).format("DD MMM")}
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
        </VictoryVoronoiContainer>
      </VictoryChart>
    </View>
  );
}
