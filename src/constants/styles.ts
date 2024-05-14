import { StyleSheet } from "react-native";
import { COLORS } from "./Theme";

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 6,
    padding: 12,
    color: COLORS.prime_text,
    borderColor: COLORS.blur_border,
    borderWidth: 1
  },
  containerStyle: {
    backgroundColor: COLORS.bg,
    borderRadius: 6,
    borderColor: "transparent",
    padding: 15
  },
  icon: {
    marginRight: 5
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor:"#191919e8"
  },
  textItem: {
    flex: 1,
    color: COLORS.prime_text
    // fontSize: 16,
  },
  placeholderStyle: {
    color: COLORS.prime_text,
    fontFamily: "JostRegular"
  },
  selectedTextStyle: {
    color: COLORS.prime_text,
    fontFamily: "JostRegular",
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: COLORS.prime_text,
    fontFamily: "JostRegular",
    borderRadius: 6
  }
});

export { styles };
