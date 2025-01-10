import { GetProps, ToggleGroup, styled } from "tamagui";
import { COLORS } from "../constants";

export const SharedToggle = styled(ToggleGroup, {
  name: "SharedToggle",
  acceptsClassName: true,
  // overflow: "scroll",
  size: "$3",
  //   px: 15,
  //   h: 46,
});
export const SharedToggleItem = styled(ToggleGroup.Item, {
  name: "SharedToggleItem",
  acceptsClassName: true,
//   borderColor: COLORS.blur_border,
//   backgroundColor:'green',
});
