// package
import React, { useEffect, useState } from "react";
import { XStack, Text, YStack, View, Button, Input } from "tamagui";
// form
import { useForm, Controller } from "react-hook-form";
// icons
import { Ionicons } from "@expo/vector-icons";
// styles
import { COLORS } from "@/src/constants";
import { SharedInput } from "@/src/shared/SharedInput";

export default function CreateScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: ""
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
          render={({ field: { onChange, onBlur, value } }) => <SharedInput />}
          name="firstName"
        />
      </YStack>
    </>
  );
}
