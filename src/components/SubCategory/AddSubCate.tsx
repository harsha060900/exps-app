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
  useAddSubCateMutation,
  useUpdateSubCateMutation
} from "@/src/store/services/subCateApi";

type AddProps = {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  setEditData: (data: {}) => void;
  setEditId: (data: null) => void;
  setCateId: (data: number | null) => void;
  editData: {} | null;
  editId: number | null;
  cateId: number | null;
};
type FormType = {
  sub_cate_name: string;
};

export default function AddSubCate({
  isOpen,
  setIsOpen,
  editData,
  editId,
  setEditData,
  setEditId,
  setCateId,
  cateId
}: AddProps) {
  const [addSubCate] = useAddSubCateMutation();
  const [updateSubCate] = useUpdateSubCateMutation();
  //   const allIcons = Object.keys(Ionicons.glyphMap);
  //   const iconsList = allIcons.filter(
  //     (name) => !name.includes("outline") && !name.includes("sharp")
  //   );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      sub_cate_name: ""
    }
  });

  useEffect(() => {
    if (editId) {
      setValue("sub_cate_name", editData?.sub_cate_name);
    }
  }, [editData]);

  async function handleFormSubmit(data: FormType) {
    let res;
    try {
      if (editId) {
        let flag = {
          id: editId,
          data: {
            sub_cate_name: data.sub_cate_name,
            cate_id: editData?.cate_id
          }
        };
        res = await updateSubCate(flag).unwrap();
        setEditData({});
        setEditId(null);
      } else {
        let flag = {
          sub_cate_name: data.sub_cate_name,
          cate_id: cateId
        };
        res = await addSubCate(flag).unwrap();
      }
      SharedToast(res.message, COLORS.success, COLORS.primary);
    } catch (err) {
      console.log("err:", err);
    }
    reset();
    setIsOpen(false);
  }

  return (
    <>
      <Dialog modal open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            bc={"#00000099"}
            onPress={() => {
              setIsOpen(false);
              setEditData({});
              setEditId(null);
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
                  label="Subcategory Name*"
                  name="sub_sub_cate_name"
                  errors={errors}
                >
                  <SharedInput
                    borderColor={
                      errors.sub_cate_name ? COLORS.error : COLORS.blur_border
                    }
                    onChangeText={onChange}
                    value={value}
                  />
                </SharedController>
              )}
              name="sub_cate_name"
            />

            {/* Buttons */}
            <XStack mt={5} jc={"flex-end"} gap={10}>
              <SharedCancelBtn
                onPress={() => {
                  setIsOpen(false);
                  reset();
                  setEditData({});
                  setEditId(null);
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
