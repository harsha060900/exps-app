import React, { useState } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
// styles
import { COLORS, styles } from "@/src/constants";
// compo
import { Dropdown } from "react-native-element-dropdown";
import SharedDropdown from "@/src/shared/SharedDropdown";

export default function Spending() {
  const [timeValue, setTimeValue] = useState({
    label: "This Week",
    value: "week"
  });
  const timeFilter = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Custom", value: "custom" }
  ];

  function setRange(item) {
    console.log("I:", item);
    return;
  }
  return (
    <>
      <Text fontSize={"$7"} fontFamily={"$heading"} mb={10}>
        Spending
      </Text>
      <SharedDropdown
        a={(i) => setRange(i)}
        data={timeFilter}
        placeholder="Select range"
      />
    </>
  );
}
