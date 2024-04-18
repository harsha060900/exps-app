import { ReactNode } from "react";
import { GetProps, Input, Label, YStack, styled } from "tamagui";
import { COLORS } from "../constants";

type ControlType = {
  label: string;
  name: string;
  errors: any;
  children: ReactNode;
};
export const SharedController = ({
  label,
  name,
  errors,
  children
}: ControlType) => {
  return (
    <YStack mb={15}>
      <Label size={"$3"} color={COLORS.neutral_text} letterSpacing={0.7}>
        {label}
      </Label>
      {children}
    </YStack>
  );
};
