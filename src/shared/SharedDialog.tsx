// package
import React, { useEffect, useState } from "react";
import { XStack, Dialog } from "tamagui";
// compo
import { SharedCancelBtn, SharedSaveBtn } from "@/src/shared/SharedBtn";

export default function SharedDialog({ open, children, onClose }) {
  return (
    <Dialog modal open={open}>
      <Dialog.Portal>
        <Dialog.Overlay bc={"#00000099"} onPress={onClose} key="overlay" />
        <Dialog.Content>
          <Dialog.Title></Dialog.Title>
          {children}
          {/* Buttons */}
          {/* <XStack mt={5} jc={"center"} gap={10}>
            <SharedCancelBtn onPress={() => {}}>Cancel</SharedCancelBtn>
            <SharedSaveBtn onPress={() => {}}>
            </SharedSaveBtn>
          </XStack> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
