import { GetProps, Input, Label, YStack, styled } from "tamagui";

const CustomInput = styled(Input, {
  name: "CustomInput",
  overflow: "scroll",
  borderColor: "#fff",
  size: "$5"
});

export const SharedInput = () => {
  return (
    <YStack>
      <Label size={"$4"} color={"#C0C0C0"}>
        Text
      </Label>
      <CustomInput />
    </YStack>
  );
};
