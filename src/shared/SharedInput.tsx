import { GetProps, Input, Label, YStack, styled } from "tamagui";
import { COLORS } from "../constants";

export const SharedInput = styled(Input, {
  name: "SharedInput",
  acceptsClassName: true,
  // overflow: "scroll",
  borderColor: COLORS.blur_border,
  focusStyle: { borderColor: "#fff" },
  size: "$5",
  px: 15,
  letterSpacing: 0.7
});
