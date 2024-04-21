// package
import { useGetCategoryQuery } from "@/src/store/services/categoryApi";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  XStack,
  Text,
  YStack,
  View,
  Button,
  Accordion,
  Stack,
  Spinner,
} from "tamagui";
// Icons
import { Feather, FontAwesome } from "@expo/vector-icons";
// Style
import { COLORS } from "@/src/constants";
// components
import Fab from "@/src/components/Category/Fab";
import AddCategory from "@/src/components/Category/AddCategory";

export default function ListCategory() {
  const { isFetching, data } = useGetCategoryQuery(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {isFetching ? (
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <Spinner size="large" />
        </Stack>
      ) : (
        <>
          <Accordion type="multiple" flex={1}>
            {data?.map((ele: CateListType, ind: number) => (
              <Accordion.Item value={String(ele.id)} key={ind}>
                <XStack
                  ai={"center"}
                  borderBottomColor={"#ffffff25"}
                  borderBottomWidth={1}
                >
                  <Accordion.Trigger pl={0} fd={"row"} bw={0} flex={1}>
                    {({ open }: any) => (
                      <XStack ai="center" gap={8}>
                        <FontAwesome
                          name={`caret-${open ? "up" : "down"}`}
                          size={20}
                          color={COLORS.icon}
                        />
                        <Text
                          color={COLORS.prime_text}
                          textTransform="capitalize"
                          fontSize={"$5"}
                        >
                          {ele.cate_name}
                        </Text>
                      </XStack>
                    )}
                  </Accordion.Trigger>
                  {/* Action Icons */}
                  <Action />
                </XStack>
                <Accordion.Content>
                  <Text color={COLORS.neutral_text}>{ele.id}</Text>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
          <Fab setIsOpen={(data) => setDialogOpen(data)} />
          <AddCategory
            isOpen={dialogOpen}
            setIsOpen={(data) => setDialogOpen(data)}
          />
        </>
      )}
    </>
  );
}

function Action() {
  return (
    <XStack gap={10}>
      <Stack>
        <Feather name="edit-2" size={20} color={COLORS.icon} />
      </Stack>
      <Stack>
        <Feather name="trash-2" size={20} color={COLORS.icon} />
      </Stack>
    </XStack>
  );
}

type CateListType = {
  id?: number;
  cate_name: string;
};
