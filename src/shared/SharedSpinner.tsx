import React from "react";
import { Stack, Spinner } from "tamagui";

export default function SharedSpinner() {
  return (
    <Stack alignItems="center" justifyContent="center" flex={1}>
      <Spinner size="large" />
    </Stack>
  );
}
