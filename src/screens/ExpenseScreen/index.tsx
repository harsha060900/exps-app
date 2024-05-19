import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
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
import { useAddExpenseMutation } from "@/src/store/services/expenseApi";

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
      desc: ""
    }
  });
  const [cateId, setCateId] = useState("");
  const { data: cateList, isFetching } = useGetCategoryQuery("");
  const { data: subCateList, isFetching: loading } = useGetSubCateQuery(
    cateId,
    {
      skip: !cateId
    }
  );
  const [addExpense] = useAddExpenseMutation();

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

  const handleFormSubmit = async (value) => {
    let res;
    console.log('v:',value);
    
    try {
      res = await addExpense(value).unwrap();
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
                  <ScrollView>
                    <XStack gap={10}>
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
                                    ? "#ffffff10"
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
                          Select a category
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
                Add
              </SharedSaveBtn>
            </XStack>
          </ScrollView>
        </YStack>
      )}
    </>
  );
}
