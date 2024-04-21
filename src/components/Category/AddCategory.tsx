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
  Dialog,
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
import { SharedCancelBtn, SharedSaveBtn } from "@/src/shared/SharedBtn";
import { useAddCategoryMutation } from "@/src/store/services/categoryApi";

type AddProps = {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
};
type  FormType = {
cate_name:string
}

export default function AddCategory({ isOpen, setIsOpen }: AddProps) {
const[addCategory] = useAddCategoryMutation()

  const allIcons = Object.keys(Ionicons.glyphMap);
  const iconsList = allIcons.filter(
    (name) => !name.includes("outline") && !name.includes("sharp")
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      cate_name: "",
    },
  });

  async function handleFormSubmit(data:FormType){
    console.log('res:',data); 
    try{
      await addCategory(data).unwrap()
    }
    catch(err){
      console.log('err:',err); 
    }
    reset()
    setIsOpen(false)
  }

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
          <Dialog.Content
            bg={COLORS.bg}
            w={320}
            px={25}
          >
              <Controller
                control={control}
                rules={{
                  // required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SharedController
                    label="Category"
                    name="category"
                    errors={errors}
                  >
                    <SharedInput onChangeText={onChange} value={value} />
                  </SharedController>
                )}
                name="cate_name"
              />
            
              {/* Buttons */}
              <XStack mt={13} jc={"flex-end"} gap={10}>
                <SharedCancelBtn onPress={()=>setIsOpen(false)}>
                  Cancel
                </SharedCancelBtn>
                <SharedSaveBtn onPress={handleSubmit(handleFormSubmit)}>
                  Add
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
