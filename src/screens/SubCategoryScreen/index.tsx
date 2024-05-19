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
  useGetSubCateQuery,
  useDeleteSubCateMutation
} from "@/src/store/services/subCateApi";

export default function SubCategoryScreen() {
  const { isFetching, data } = useGetSubCateQuery(null);
  const [deleteCategory] = useDeleteSubCateMutation();
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function delAction({ data }) {
    try {
      let del = await deleteCategory(data.id);
      console.log("id:", del);
      SharedToast(del?.data?.message, COLORS.error_lite, COLORS.prime_red);
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

  return (
    <>
      {isFetching ? (
        <Stack alignItems="center" justifyContent="center" flex={1}>
          <Spinner size="large" />
        </Stack>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Accordion type="multiple" flex={1}>
              {data?.map((ele: SubCateListType, ind: number) => (
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
                            {ele.sub_cate_name}
                          </Text>
                        </XStack>
                      )}
                    </Accordion.Trigger>
                    {/* Action Icons */}
                    <Action data={ele} />
                  </XStack>
                  <Accordion.Content>
                    <Text color={COLORS.neutral_text}>{ele.id}</Text>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          </ScrollView>
          {/* <Fab setIsOpen={(data) => setDialogOpen(data)} /> */}
          <AddCategory
            editData={editData}
            editId={editId}
            isOpen={dialogOpen}
            setIsOpen={(data) => setDialogOpen(data)}
          />
        </>
      )}
    </>
  );
}

type SubCateListType = {
  id?: number;
  sub_cate_name: string;
};
