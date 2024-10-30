import React, { useState } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
import Spending from "@/src/components/Stat/Spending";
import MoneyFlow from "@/src/components/Stat/MoneyFlow";

export default function StatScreen() {
  return (
    <>
      <Spending />
      <MoneyFlow />
    </>
  );
}
