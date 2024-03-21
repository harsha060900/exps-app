import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard"
        }}
      />
      <Tabs.Screen name="graph" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
