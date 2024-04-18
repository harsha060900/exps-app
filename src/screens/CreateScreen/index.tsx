// package
import React, { useEffect, useState } from "react";
import {
  XStack,
  Text,
  YStack,
  View,
  Button,
  Input,
  Stack,
  Spinner
} from "tamagui";
// form
import { useForm, Controller } from "react-hook-form";
// icons
import { Ionicons } from "@expo/vector-icons";
// styles
import { COLORS } from "@/src/constants";
import { SharedInput } from "@/src/shared/SharedInput";
import { SharedController } from "@/src/shared/SharedController";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function CreateScreen() {
  const allIcons = Object.keys(Ionicons.glyphMap);
  const iconsList = allIcons.filter(
    (name) => !name.includes("outline") && !name.includes("sharp")
  );

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: "",
      subCategory: ""
    }
  });

  return (
    <>
      <YStack flex={1}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SharedController label="Category" name="category" errors={errors}>
              <SharedInput />
            </SharedController>
          )}
          name="category"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <SharedController
              label="Sub Category"
              name="subCategory"
              errors={errors}
            >
              <SharedInput />
            </SharedController>
          )}
          name="subCategory"
        />
        {/* {iconsList.map((name) => (
          <Ionicons
            key={name}
            name={name}
            size={32}
            style={{ margin: 5 }}
            color={"#fff"}
          />
        ))} */}
      </YStack>
    </>
  );
}
