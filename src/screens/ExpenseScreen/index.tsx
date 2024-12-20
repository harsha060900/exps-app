import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import {
  XStack,
  Text,
  YStack,
  Stack,
  View,
  Button,
  ScrollView,
  TextArea,
  Spinner
} from "tamagui";
import { Chip } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// form
import { useForm, Controller } from "react-hook-form";
// compo
import { SharedInput } from "@/src/shared/SharedInput";
import { SharedController } from "@/src/shared/SharedController";
import { SharedToast } from "@/src/shared/SharedToast";
import { SharedCancelBtn, SharedSaveBtn } from "@/src/shared/SharedBtn";
// styles
import { COLORS, styles } from "@/src/constants";
// icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// redux store
import { useGetCategoryQuery } from "@/src/store/services/categoryApi";
import { useGetSubCateQuery } from "@/src/store/services/subCateApi";
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation
} from "@/src/store/services/expenseApi";
import moment from "moment";
import { expenseState } from "@/src/store/slices/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { revertAll } from "@/src/store/actions";
import { router } from "expo-router";

export default function ExpenseScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      amt: "",
      cate_id: "",
      sub_cate_id: null,
      period: "",
      desc: "",
      type: "expense"
    }
  });
  const [cateId, setCateId] = useState("");
  const [edit, setEdit] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { data: cateList, isFetching } = useGetCategoryQuery("");
  const { data: subCateList, isFetching: loading } = useGetSubCateQuery(cateId);
  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const dispatch = useDispatch();
  const { editExpense: expStore } = useSelector(expenseState);
  const [expenseId, setExpenseId] = useState(null);
  useEffect(() => {
    if (expStore.id) {
      setEdit(true);
      setValue("amt", String(expStore.amt));
      setValue("period", moment(expStore.period).format("yyyy-MM-DD HH:mm:ss"));
      setValue("cate_id", expStore.cateId);
      setCateId(expStore.cateId);
      setValue("sub_cate_id", expStore.subCateId);
      setValue("desc", expStore.desc);
      setExpenseId(expStore.id);
      dispatch(revertAll());
    }
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {/* {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )} */}
      </View>
    );
  };

  const handleDateChange = (val) => {
    setValue("period", val);
    setDateOpen(false);
  };

  const handleFormSubmit = async (value) => {
    let res;
    try {
      if (!edit) res = await addExpense(value).unwrap();
      else {
        res = await updateExpense({ data: value, id: expenseId }).unwrap();
        router.back();
      }
      SharedToast(res.message, COLORS.success, COLORS.primary);
    } catch (err) {
      console.log("err:", err.data.message);
    }
    reset();
  };

  return (
    <>
      {isFetching ? (
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <Spinner size="large" />
        </Stack>
      ) : (
        <YStack flex={1}>
          <ScrollView>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Must fill this field" }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SharedController label="Amount*" name="amt" errors={errors}>
                  <View pos={"relative"}>
                    <SharedInput
                      borderColor={
                        errors.amt ? COLORS.prime_red : COLORS.blur_border
                      }
                      onChangeText={onChange}
                      value={value}
                      paddingLeft={35}
                      keyboardType={"number-pad"}
                    />
                    <MaterialCommunityIcons
                      style={{ position: "absolute", top: 11, left: 8 }}
                      name="currency-inr"
                      size={24}
                      color={COLORS.icon}
                    />
                  </View>
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
            {/* Category Dropdown */}
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Must fill this field" }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SharedController
                  label="Category*"
                  name="cate_id"
                  errors={errors}
                >
                  <Dropdown
                    style={[
                      styles.dropdown,
                      {
                        borderColor: errors.cate_id
                          ? COLORS.prime_red
                          : COLORS.blur_border
                      }
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    itemContainerStyle={{ backgroundColor: COLORS.bg }}
                    itemTextStyle={{ fontSize: 16 }}
                    containerStyle={styles.containerStyle}
                    backgroundColor="#00000099"
                    activeColor="#ffffff15"
                    data={cateList?.data?.map((ele, ind) => ({
                      label: ele.cate_name,
                      value: ele.id
                    }))}
                    search
                    // mode="modal"
                    maxHeight={400}
                    labelField="label"
                    valueField="value"
                    placeholder="Select category"
                    searchPlaceholder="Search category"
                    value={value}
                    onChange={(item) => {
                      onChange(item.value);
                      setCateId(item.value);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                    // )}
                    renderItem={renderItem}
                  />
                </SharedController>
              )}
              name="cate_id"
            />

            {/* Sub Category */}
            <Controller
              control={control}
              rules={{}}
              render={({ field: { onChange, onBlur, value } }) => (
                <SharedController
                  label="Subcategory"
                  name="sub_cate_id"
                  errors={errors}
                >
                  <ScrollView horizontal={true}>
                    <XStack gap={10} h={33}>
                      {loading ? (
                        <Spinner size="small" />
                      ) : watch("cate_id") ? (
                        subCateList?.data?.length !== 0 ? (
                          subCateList?.data?.map((subCate, ind) => (
                            <Chip
                              // selected={value == subCate.id ? true : false}
                              selectedColor={
                                value == subCate.id
                                  ? COLORS.primary
                                  : COLORS.prime_text
                              }
                              mode="outlined"
                              style={{
                                backgroundColor:
                                  value != subCate.id
                                    ? COLORS.card_bg
                                    : COLORS.primary_lite,
                                borderRadius: 50
                              }}
                              onPress={() => {
                                if (value && value === subCate.id)
                                  setValue("sub_cate_id", null);
                                else onChange(subCate.id);
                              }}
                              key={ind}
                            >
                              <Text
                                fontSize={"$3"}
                                color={
                                  value == subCate.id
                                    ? COLORS.primary
                                    : COLORS.prime_text
                                }
                              >
                                {subCate.sub_cate_name}
                              </Text>
                            </Chip>
                          ))
                        ) : (
                          <Chip
                            selectedColor={COLORS.primary}
                            mode="outlined"
                            style={{
                              backgroundColor: COLORS.primary_lite,
                              borderRadius: 50
                            }}
                          >
                            <Text fontSize={"$3"} color={COLORS.primary}>
                              No subcategory found
                            </Text>
                          </Chip>
                        )
                      ) : (
                        <Text
                          ml={15}
                          fontSize={"$3"}
                          color={COLORS.neutral_text}
                        >
                          Please select a category
                        </Text>
                      )}
                    </XStack>
                  </ScrollView>
                </SharedController>
              )}
              name="sub_cate_id"
            />

            {/* Desc */}
            <Controller
              control={control}
              rules={{}}
              render={({ field: { onChange, onBlur, value } }) => (
                <SharedController
                  label="Description"
                  name="desc"
                  errors={errors}
                >
                  <TextArea
                    //   borderColor={errors.cate_name ? COLORS.error : COLORS.blur_border}
                    borderColor={COLORS.blur_border}
                    onChangeText={onChange}
                    value={value}
                    focusStyle={{ borderColor: "#fff" }}
                    // px="15"
                    h="46"
                    letterSpacing={0.7}
                    textAlignVertical="top"
                  />
                </SharedController>
              )}
              name="desc"
            />
            <XStack mt={70} jc={"center"} gap={10}>
              <SharedSaveBtn onPress={handleSubmit(handleFormSubmit)}>
                {edit ? "Update" : "Add"}
              </SharedSaveBtn>
            </XStack>
          </ScrollView>
        </YStack>
      )}
    </>
  );
}
