import { GetProps, Input, Label, YStack, styled } from "tamagui";
import { COLORS } from "../constants";

export const SharedInput = styled(Input, {
  name: "SharedInput",
  acceptsClassName: true,
  // overflow: "scroll",
  focusStyle: { borderColor: "#fff" },
  size: "$3",
  px: 15,
  h: 46,
  letterSpacing: 0.7,
  placeholderTextColor: COLORS.blur_border
});
