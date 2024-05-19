// Package
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
// Icons
import { Ionicons } from "@expo/vector-icons";
// style
import { COLORS } from "@/src/constants";
// Components and Screens
import HomeScreen from "@/src/screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import AddCategory from "../components/Category/AddCategory";

export default function HomeLayout() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Category",
          headerStyle: {
            backgroundColor: COLORS.bg
          },
          headerTintColor: COLORS.prime_text,
          headerTitleStyle: {
            fontFamily: "JostSemiBold"
          },
          headerShadowVisible: false,
          headerLeft: (props) => (
            <Ionicons
              name="chevron-back"
              style={{ marginRight: 25 }}
              size={24}
              color="#fff"
              onPress={() => router.back()}
            />
          ),
          headerRight: (props) => (
            <Ionicons
              name="add"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                padding: 8,
                marginRight: 5
              }}
              size={20}
              color={"#fff"}
              onPress={() => setDialogOpen(true)}
            />
          )
        }}
      />
      <XStack px={22} flex={1} bg={COLORS.bg}>
        <CategoryScreen />
      </XStack>
      <AddCategory
        isOpen={dialogOpen}
        setIsOpen={(data) => setDialogOpen(data)}
        editData={null}
        editId={null}
        setEditData={(data) => setEditData(data)}
        setEditId={(data) => setEditId(data)}
      />
    </>
  );
}
