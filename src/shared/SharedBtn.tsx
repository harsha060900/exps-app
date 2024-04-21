import { Button, styled } from "tamagui";
import { COLORS } from "../constants";

export const SharedCancelBtn = styled(Button, {
    name: "SharedCancelBtn",
    acceptsClassName: true,
    // overflow: "scroll",
    borderColor: COLORS.neutral_text,
    color: COLORS.neutral_text,
    fontFamily:'$medium'
  });

  export const SharedSaveBtn = styled(Button, {
    name: "SharedSaveBtn",
    acceptsClassName: true,
    // overflow: "scroll",
    bg: COLORS.primary,
    fontFamily:'$medium'
  });