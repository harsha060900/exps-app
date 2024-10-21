import React, { useEffect, useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { router } from "expo-router";
import { usePathname } from "expo-router";
// icons
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// styles
import { COLORS } from "@/src/constants";
// components
import Income from "../components/Income";

type FABProps = {
  open: boolean;
  onStateChange: (value: boolean) => void;
};

export default function SharedFAB({ open, onStateChange }: FABProps) {
  const pathname = usePathname();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Portal>
        <FAB.Group
          open={open}
          visible={!(pathname === "/expense") && !(pathname === "/category")}
          icon={open ? "close" : "plus"}
          backdropColor="#000000a1"
          style={{
            paddingBottom: 40
          }}
          fabStyle={{
            backgroundColor: COLORS.primary,
            borderRadius: 50
          }}
          color={"#fff"}
          actions={[
            {
              icon: "currency-inr",
              label: "Income",
              color: COLORS.prime_text,
              style: {
                backgroundColor: COLORS.primary,
                borderRadius: 50
              },
              labelTextColor: COLORS.prime_text,
              onPress: () => setDialogOpen(true)
            },
            {
              icon: "currency-inr",
              label: "Expense",
              color: COLORS.prime_text,
              style: { backgroundColor: COLORS.primary, borderRadius: 50 },
              labelTextColor: COLORS.prime_text,
              onPress: () => router.push("/expense")
            },
            // {
            //   icon: () => (
            //     <Ionicons
            //       name="filter"
            //       size={21}
            //       style={{ paddingLeft: 1, paddingTop: 2 }}
            //       color="#fff"
            //     />
            //   ),
            //   label: "Sub Category",
            //   color: "#fff",
            //   style: { backgroundColor: COLORS.primary, borderRadius: 50 },
            //   onPress: () => router.push("/subCategory")
            // },
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
              color: COLORS.icon,
              style: { backgroundColor: COLORS.primary, borderRadius: 50 },
              labelTextColor: COLORS.prime_text,
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
      </Portal>
      <Income
        isOpen={dialogOpen}
        setIsOpen={(data) => setDialogOpen(data)}
        editData={null}
        setEditData={() => {}}
      />
    </>
  );
}
