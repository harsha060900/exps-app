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
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
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
import AddSubCate from "@/src/components/SubCategory/AddSubCate";
import { useDeleteSubCateMutation } from "@/src/store/services/subCateApi";

export default function ListCategory() {
  const [searchParams, setSearchParams] = useState("");
  const [text, setText] = useState("");

  const { isFetching, data } = useGetCategoryQuery(searchParams);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteSubCate] = useDeleteSubCateMutation();
  // cate states
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  // sub-cate states
  const [cateId, setCateId] = useState(null);
  const [subCaForm, setSubCaForm] = useState(false);
  const [editSubData, setEditSubData] = useState({});
  const [editSubId, setEditSubId] = useState(null);

  async function delAction({ data }) {
    try {
      let del = await deleteCategory(data.id);
      SharedToast(del?.data?.message, COLORS.primary_lite, COLORS.primary);
    } catch (err) {
      console.log("err:", err);
      // SharedToast(err, COLORS.error)
    }
  }

  async function subDelAction(data) {
    try {
      let del = await deleteSubCate(data.id);
      SharedToast(del?.data?.message, COLORS.error_lite, COLORS.prime_red);
    } catch (err) {
      console.log("err:", err);
      // SharedToast(err, COLORS.error)
    }
  }

  function Action(data) {
    return (
      <XStack gap={12}>
        <Stack
          onPress={() => {
            setSubCaForm(true);
            setCateId(data.data.id);
          }}
        >
          <Feather name="plus" size={23} color={COLORS.green1} />
        </Stack>
        <Stack
          onPress={() => {
            setDialogOpen(true);
            setEditData(data.data);
            setEditId(data.data.id);
          }}
        >
          <MaterialCommunityIcons name="pencil" size={20} color={COLORS.warn} />
        </Stack>
        <Stack onPress={() => delAction(data)}>
          <FontAwesome name="trash" size={20} color={COLORS.prime_red} />
        </Stack>
      </XStack>
    );
  }

  function SubCateAction({ data }) {
    return (
      <XStack gap={15}>
        <Stack
          onPress={() => {
            setSubCaForm(true);
            setEditData(data);
            setEditId(data.id);
          }}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color={COLORS.warn_lite}
          />
        </Stack>
        <Stack onPress={() => subDelAction(data)}>
          <FontAwesome name="trash" size={20} color={COLORS.error_lite} />
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
                        <Accordion.Content key={ind} bg={"#aaaaaa20"}>
                          <XStack ai="center" jc={"space-between"}>
                            <Text
                              textTransform="capitalize"
                              fontSize={"$3"}
                              color={COLORS.neutral_text}
                            >
                              {subCate.sub_cate_name}
                            </Text>
                            <SubCateAction data={subCate} />
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
            setEditData={(data) => setEditData(data)}
            setEditId={(data) => setEditId(data)}
          />
          <AddSubCate
            isOpen={subCaForm}
            setIsOpen={(data) => setSubCaForm(data)}
            editData={editData}
            setEditData={(data) => setEditData(data)}
            editId={editId}
            setEditId={(data) => setEditId(data)}
            cateId={cateId}
            setCateId={(data) => setCateId(data)}
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
