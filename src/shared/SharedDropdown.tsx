import React, { useEffect, useState } from "react";
import { Text, View } from "tamagui";
import { Dropdown } from "react-native-element-dropdown";
// styles
import { COLORS, styles } from "@/src/constants";

type DropdownProps = {
  data: { label: string; value: string }[];
  placeholder: string;
};

export default function SharedDropdown({
  data,
  placeholder,
  a
}: DropdownProps) {
  console.log("P:", placeholder);
  // rendering dropdown list
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
    <Dropdown
      style={[
        styles.dropdown,
        {
          borderColor: COLORS.blur_border
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
      mode="modal"
      maxHeight={400}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search category"
      renderItem={renderItem}
      onChange={(item) => {
        a(item);
      }}
      data={data}
      //   value={value}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
    />
  );
}
