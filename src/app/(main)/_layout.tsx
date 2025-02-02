import { COLORS } from "@/src/constants";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function MainLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="home"
              size={26}
              color={focused ? color : COLORS.icon}
            />
          )
        }}
      />
      {/* <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="home" size={26} color={focused ? color : COLORS.icon} />
          )
        }}
      /> */}
      <Tabs.Screen
        name="graph"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="barschart"
              size={26}
              color={focused ? color : COLORS.icon}
            />
          )
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="list-alt"
              size={28}
              color={focused ? color : COLORS.icon}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="user"
              size={26}
              color={focused ? color : COLORS.icon}
            />
          )
        }}
      />
    </Tabs>
  );
}
