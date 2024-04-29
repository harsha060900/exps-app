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
  Spinner,
  Dialog
} from "tamagui";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
// form
import { useForm, Controller } from "react-hook-form";
// icons
import { Ionicons } from "@expo/vector-icons";
// styles
import { COLORS } from "@/src/constants";
// compo
import { SharedInput } from "@/src/shared/SharedInput";
import { SharedController } from "@/src/shared/SharedController";
import { SharedToast } from "@/src/shared/SharedToast";
import { SharedCancelBtn, SharedSaveBtn } from "@/src/shared/SharedBtn";
// redux
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation
} from "@/src/store/services/categoryApi";

type AddProps = {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  editData: {};
  editId: number | null;
};
type FormType = {
  cate_name: string;
};

export default function AddCategory({
  isOpen,
  setIsOpen,
  editData,
  editId
}: AddProps) {
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const allIcons = Object.keys(Ionicons.glyphMap);
  const iconsList = allIcons.filter(
    (name) => !name.includes("outline") && !name.includes("sharp")
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      cate_name: ""
    }
  });

  async function handleFormSubmit(data: FormType) {
    let res;
    try {
      if (editId) {
        let flag = {
          id: editId,
          data: data
        };
        res = await updateCategory(flag).unwrap();
      } else {
        res = await addCategory(data).unwrap();
      }
      SharedToast(res.message, COLORS.success);
    } catch (err) {
      console.log("err:", err);
    }
    reset();
    setIsOpen(false);
  }

  useEffect(() => {
    console.log('id:', editId);
    
    if (editId) {
      setValue("cate_name", editData?.cate_name);
    }
  }, [editData]);

  return (
    <>
      <Dialog modal open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            bc={"#00000099"}
            onPress={() => {
              setIsOpen(false);
            }}
            key="overlay"
          />
          <Dialog.Content bg={COLORS.bg} w={320} px={25}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Must fill this field" }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SharedController
                  label="Category Name*"
                  name="cate_name"
                  errors={errors}
                >
                  <SharedInput
                    borderColor={
                      errors.cate_name ? COLORS.error : COLORS.blur_border
                    }
                    onChangeText={onChange}
                    value={value}
                  />
                </SharedController>
              )}
              name="cate_name"
            />

            {/* Buttons */}
            <XStack mt={5} jc={"flex-end"} gap={10}>
              <SharedCancelBtn
                onPress={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
                Cancel
              </SharedCancelBtn>
              <SharedSaveBtn onPress={handleSubmit(handleFormSubmit)}>
                {editId ? "Update" : "Add"}
              </SharedSaveBtn>
            </XStack>
          </Dialog.Content>
        </Dialog.Portal>
        {/* {iconsList.map((name) => (
          <Ionicons
            key={name}
            name={name}
            size={32}
            style={{ margin: 5 }}
            color={"#fff"}
          />
        ))} */}
      </Dialog>
    </>
  );
}