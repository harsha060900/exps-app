// package
import React, { useEffect, useState } from "react";
import { XStack, Dialog, View } from "tamagui";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Keyboard } from "react-native";
import moment from "moment";
// form
import { useForm, Controller } from "react-hook-form";
// icons
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// styles
import { COLORS } from "@/src/constants";
// compo
import { SharedInput } from "@/src/shared/SharedInput";
import { SharedController } from "@/src/shared/SharedController";
import { SharedToast } from "@/src/shared/SharedToast";
import { SharedCancelBtn, SharedSaveBtn } from "@/src/shared/SharedBtn";
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation
} from "@/src/store/services/expenseApi";

type AddProps = {
  isOpen: boolean;
  setIsOpen: (data: boolean) => void;
  setEditData: (data: {}) => void;
  setEditId: (data: null) => void;
  editData: {} | null;
  editId: number | null;
};

type FormType = {
  amt: string;
  period: string;
};

export default function Income({
  isOpen,
  setIsOpen,
  editData,
  setEditData
}: AddProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      period: "",
      amt: "",
      type: "income"
    }
  });
  const [dateOpen, setDateOpen] = useState(false);
  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();

  async function handleFormSubmit(value: FormType) {
    let res;
    console.log("V:", value);

    try {
      if (!editData) res = await addExpense(value).unwrap();
      else {
        res = await updateExpense({ data: value, id: expenseId }).unwrap();
      }
      SharedToast(res.message, COLORS.success, COLORS.primary);
    } catch (err) {
      console.log("err:", err);
    }
    reset();
    setIsOpen(false);
  }
  const handleDateChange = (val) => {
    setDateOpen(false);
    setValue("period", val);
  };

  useEffect(() => {
    if (editData?.id) {
      setValue("amt", String(editData.amt));
      setValue("period", moment(editData.period).format("yyyy-MM-DD HH:mm:ss"));
    }
  }, []);

  return (
    <Dialog modal open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          bc={"#00000099"}
          onPress={() => {
            setIsOpen(false);
            setEditData({});
            reset();
          }}
          key="overlay"
        />
        <Dialog.Content bg={COLORS.bg} w={320} px={25}>
          <Dialog.Title mb={10} size={"$6"}>
            {editData ? "Update" : "Add"} Expense
          </Dialog.Title>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Must fill this field" }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SharedController label="Amount*" name="amt" errors={errors}>
                <SharedInput
                  borderColor={
                    errors.amt ? COLORS.prime_red : COLORS.blur_border
                  }
                  onChangeText={onChange}
                  value={value}
                />
              </SharedController>
            )}
            name="amt"
          />
          {/* Date Picker */}
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Must fill this field" }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SharedController label="Period*" name="period" errors={errors}>
                <View pos={"relative"}>
                  <SharedInput
                    borderColor={
                      errors.period ? COLORS.prime_red : COLORS.blur_border
                    }
                    value={
                      value ? moment(value).format("MMM DD YYYY HH:mm") : ""
                    }
                    placeholder="Pick a date and time"
                    paddingLeft={35}
                    onPress={() => setDateOpen(true)}
                    // disabled
                    onFocus={() => Keyboard.dismiss()}
                  />
                  <MaterialCommunityIcons
                    style={{ position: "absolute", top: 11, left: 8 }}
                    name="calendar-month-outline"
                    size={24}
                    color={COLORS.icon}
                  />
                  <DateTimePickerModal
                    date={new Date()}
                    isVisible={dateOpen}
                    mode="datetime"
                    is24Hour={true}
                    maximumDate={new Date()}
                    onConfirm={handleDateChange}
                    onCancel={() => setDateOpen(false)}
                  />
                </View>
              </SharedController>
            )}
            name="period"
          />
          {/* Buttons */}
          <XStack mt={5} jc={"flex-end"} gap={10}>
            <SharedCancelBtn
              onPress={() => {
                setIsOpen(false);
                reset();
                setEditData({});
              }}
            >
              Cancel
            </SharedCancelBtn>
            <SharedSaveBtn onPress={handleSubmit(handleFormSubmit)}>
              {editData ? "Update" : "Add"}
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
  );
}
