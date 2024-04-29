import React, { useEffect, useState } from "react";
import { FAB } from "react-native-paper";
import { router } from "expo-router";
// icons
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// styles
import { COLORS } from "@/src/constants";

type FABProps = {
  open: boolean;
  onStateChange: (value: boolean) => void;
};

export default function SharedFAB({ open, onStateChange }: FABProps) {
  return (
    // <Portal>
    <FAB.Group
      open={open}
      visible
      icon={open ? "close" : "plus"}
      backdropColor="#000000a1"
      // style={{
      //   paddingBottom: 40
      // }}
      fabStyle={{
        backgroundColor: COLORS.primary,
        borderRadius: 50
      }}
      color={"#fff"}
      actions={[
        {
          icon: "currency-inr",
          label: "Expense",
          color: "#fff",
          style: { backgroundColor: COLORS.primary, borderRadius: 50 },
          onPress: () => console.log("Pressed star")
        },
        {
          icon: () => (
            <Ionicons
              name="filter"
              size={21}
              style={{ paddingLeft: 1, paddingTop: 2 }}
              color="#fff"
            />
          ),
          label: "Sub Category",
          color: "#fff",
          style: { backgroundColor: COLORS.primary, borderRadius: 50 },
          onPress: () => router.push("/subCategory")
        },
        {
          icon: () => (
            <MaterialIcons
              name="category"
              size={21}
              style={{ paddingLeft: 1 }}
              color="#fff"
            />
          ),
          label: "Category",
          color: "#fff",
          style: { backgroundColor: COLORS.primary, borderRadius: 50 },
          onPress: () => router.push("/category")
        }
      ]}
      onStateChange={(value) => onStateChange(value.open)}
      // onPress={() => {
      //   if (open) {
      //     // do something if the speed dial is open
      //   }
      // }}
    />
    // </Portal>
  );
}
