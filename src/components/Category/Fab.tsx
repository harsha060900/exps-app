import React, { useEffect, useState } from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
// icon
import { MaterialIcons } from "@expo/vector-icons";
// style
import { COLORS } from "@/src/constants";

type FABProps = {
    setIsOpen: (value: boolean) => void;
  };

export default function Fab({ setIsOpen }:FABProps) {
  return (
    // <Portal>
    <FAB.Group
      open={false}
      visible
      icon="plus"
      backdropColor="#000000a1"
      style={{
        // paddingBottom: 30,
      }}
      fabStyle={{
        backgroundColor: COLORS.primary,
        // borderRadius: 50,
      }}
      color={"#fff"}
      actions={[]}
      onStateChange={() => {}}
      onPress={() => setIsOpen(true)}
    />
    // </Portal>
  );
}
