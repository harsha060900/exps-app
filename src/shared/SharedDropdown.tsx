import React, { useEffect, useState } from "react";
import { Text, View } from "tamagui";
import { Dropdown } from "react-native-element-dropdown";
// styles
import { COLORS, styles } from "@/src/constants";

type DropdownProps = {
  data: { label: string; value: string }[];
  placeholder: string | null;
  value: { label: string; value: string };
  onChange: (item: { label: string; value: string }) => void;
};

export default function SharedDropdown({
  data,
  placeholder = "Select a value",
  value,
  onChange
}: DropdownProps) {
  // rendering dropdown list
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem} textTransform="capitalize">
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={[
        styles.dropdown,
        {
          borderColor: COLORS.blur_border,
          flex: 1
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
      search={false}
      // mode="modal"
      maxHeight={400}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search category"
      renderItem={renderItem}
      onChange={(item) => {
        onChange(item);
      }}
      data={data}
      value={value}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
    />
  );
}
