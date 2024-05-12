import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { XStack, Text, YStack, Stack, View, Button, ScrollView } from "tamagui";
import { Chip } from "react-native-paper";
2313;
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
import { useGetCategoryQuery } from "@/src/store/services/categoryApi";
import { useGetSubCateQuery } from "@/src/store/services/subCateApi";
// redux store

export default function ExpenseScreen() {
  const { data: cateList, isFetching } = useGetCategoryQuery("");
  const { data: subCateList, isFetching: loading } = useGetSubCateQuery("");
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
      sub_cate_id: ""
    }
  });

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

  return (
    <>
      {isFetching ? (
        <></>
      ) : (
        <YStack flex={1}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "Must fill this field" }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SharedController label="Amount*" name="amt" errors={errors}>
                <View pos={"relative"}>
                  <SharedInput
                    //   borderColor={errors.cate_name ? COLORS.error : COLORS.blur_border}
                    borderColor={COLORS.blur_border}
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
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  // iconStyle={styles.iconStyle}
                  itemContainerStyle={{ backgroundColor: COLORS.bg }}
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
                    {watch("cate_id") &&
                      subCateList?.data?.map((subCate, ind) => (
                        <Chip
                          // selected={value == subCate.id ? true : false}
                          selectedColor={
                            value == subCate.id
                              ? COLORS.primary
                              : COLORS.prime_text
                          }
                          mode="outlined"
                          // closeIcon={ }
                          onClose={() => {
                            setValue("sub_cate_id", "");
                          }}
                          rippleColor={COLORS.primary}
                          style={{
                            backgroundColor:
                              value != subCate.id
                                ? "#ffffff10"
                                : COLORS.primary_lite
                          }}
                          onPress={() => onChange(subCate.id)}
                          key={ind}
                        >
                          {subCate.sub_cate_name}
                        </Chip>
                      ))}
                  </XStack>
                </ScrollView>
              </SharedController>
            )}
            name="sub_cate_id"
          />
        </YStack>
      )}
    </>
  );
}
