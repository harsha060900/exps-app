// package
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import {
  XStack,
  Text,
  YStack,
  View,
  Button,
  Accordion,
  Stack,
  Spinner
} from "tamagui";
// Icons
import { Feather, FontAwesome } from "@expo/vector-icons";
// Style
import { COLORS } from "@/src/constants";
// components
// import Fab from "@/src/components/Category/Fab";
import AddCategory from "@/src/components/Category/AddCategory";
import { SharedToast } from "@/src/shared/SharedToast";
//
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation
} from "@/src/store/services/categoryApi";
import { SharedInput } from "@/src/shared/SharedInput";

export default function ListCategory() {
  const [searchParams, setSearchParams] = useState("");
  const { isFetching, data } = useGetCategoryQuery(searchParams);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("");

  async function delAction({ data }) {
    try {
      let del = await deleteCategory(data.id);
      SharedToast(del?.data?.message, COLORS.error);
    } catch (err) {
      console.log("err:", err);
      // SharedToast(err, COLORS.error)
    }
  }

  function Action(data) {
    return (
      <XStack gap={15}>
        <Stack
          onPress={() => {
            setDialogOpen(true);
            setEditData(data.data);
            setEditId(data.data.id);
          }}
        >
          <Feather name="edit-2" size={20} color={COLORS.icon} />
        </Stack>
        <Stack onPress={() => delAction(data)}>
          <Feather name="trash-2" size={20} color={COLORS.icon} />
        </Stack>
      </XStack>
    );
  }
  function SubCateAction(data) {
    return (
      <XStack gap={15}>
        <Stack
          onPress={() => {
            // setDialogOpen(true);
            // setEditData(data.data);
            // setEditId(data.data.id);
          }}
        >
          <Feather name="edit-2" size={20} color={COLORS.icon} />
        </Stack>
        <Stack onPress={}>
          <Feather name="trash-2" size={20} color={COLORS.icon} />
        </Stack>
      </XStack>
    );
  }

  return (
    <>
      {isFetching ? (
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <Spinner size="large" />
        </Stack>
      ) : (
        <YStack flex={1} mt={10}>
          <SharedInput
            value={text}
            onChangeText={setText}
            onBlur={() => setSearchParams(text)}
            placeholder="Search category"
            borderColor={COLORS.blur_border}
          />
          {data.data.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Accordion type="single" collapsible={true} flex={1}>
                {data?.data?.map((ele: CateListType, ind: number) => (
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
                              fontSize={"$4"}
                            >
                              {ele.cate_name}
                            </Text>
                          </XStack>
                        )}
                      </Accordion.Trigger>
                      {/* Action Icons */}
                      <Action data={ele} />
                    </XStack>
                    {ele.sub_cate ? (
                      ele.sub_cate.map((subCate, ind) => (
                        <Accordion.Content>
                          <XStack ai="center" jc={"space-between"}>
                            <Text
                              textTransform="capitalize"
                              fontSize={"$3"}
                              color={COLORS.neutral_text}
                            >
                              {subCate.sub_cate_name}
                            </Text>
                            <SubCateAction />
                          </XStack>
                        </Accordion.Content>
                      ))
                    ) : (
                      <></>
                    )}
                  </Accordion.Item>
                ))}
              </Accordion>
            </ScrollView>
          ) : (
            <YStack ai={"center"} jc={"center"} flex={1}>
              <Text>Category not found</Text>
            </YStack>
          )}
          {/* <Fab setIsOpen={(data) => setDialogOpen(data)} /> */}
          <AddCategory
            editData={editData}
            editId={editId}
            isOpen={dialogOpen}
            setIsOpen={(data) => setDialogOpen(data)}
          />
        </YStack>
      )}
    </>
  );
}

type CateListType = {
  id?: number;
  cate_name: string;
  sub_cate: [];
};
