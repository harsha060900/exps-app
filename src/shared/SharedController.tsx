import { ReactNode } from "react";
import { GetProps, Input, Label, Text, YStack, styled } from "tamagui";
import { COLORS } from "../constants";
import { ErrorMessage } from "@hookform/error-message";

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
    <YStack mb={10} h={102}>
      <Label size={"$3"} color={COLORS.neutral_text} letterSpacing={0.7}>
        {label}
      </Label>
      {children}
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <Text color={COLORS.error}>{message}</Text>}
        />
      )}
    </YStack>
  );
};
