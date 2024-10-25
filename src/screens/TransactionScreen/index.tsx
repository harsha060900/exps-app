import React, { useEffect, useState } from "react";
import {
  XStack,
  Text,
  YStack,
  View,
  Button,
  Separator,
  ScrollView,
  Popover
} from "tamagui";
import { Stack, router } from "expo-router";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// icons
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome
} from "@expo/vector-icons";
//styels
import { COLORS } from "@/src/constants";
// redux
import {
  useDeleteExpenseMutation,
  useGetExpenseQuery
} from "@/src/store/services/expenseApi";
import SharedSpinner from "@/src/shared/SharedSpinner";
import SharedFAB from "@/src/shared/SharedFAB";
import { useDispatch, useSelector } from "react-redux";
import { expenseState, setExpenseEdit } from "@/src/store/slices/expenseSlice";
import { SharedToast } from "@/src/shared/SharedToast";
import Income from "@/src/components/Income";

export default function TransactionScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const [editIncomeOpen, setEditIncomeOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const [searchParams, setSearchParams] = useState({
    orderBy: "desc",
    start: "",
    end: ""
  });
  const [dateOpen, setDateOpen] = useState({ isOpen: false, name: "" });
  let [finalDate, setFinalDate] = useState({
    start: "",
    end: ""
  });
  const { data, isFetching } = useGetExpenseQuery(searchParams);
  const [deleteExpense] = useDeleteExpenseMutation();
  const dispatch = useDispatch();
  const expStore = useSelector(expenseState);
  async function handleDelExp(id: number) {
    try {
      const res = await deleteExpense(id);
      SharedToast(res?.data?.message, COLORS.success, COLORS.primary);
    } catch (err) {
      console.log("err:", err);
      // SharedToast(err, COLORS.error)
    }
  }

  function Action(item) {
    return (
      <XStack gap={8}>
        <View
          onPress={() => {
            if (item.item.type === "income") {
              setEditData(item.item);
              setEditIncomeOpen(true);
            } else {
              dispatch(setExpenseEdit(item));
              router.push("/expense");
            }
          }}
        >
          <MaterialCommunityIcons name="pencil" size={20} color={COLORS.warn} />
        </View>
        <Separator borderRightColor={COLORS.blur_border} vertical />

        <View onPress={() => handleDelExp(item.item.id)}>
          <FontAwesome name="trash" size={20} color={COLORS.prime_red} />
        </View>
      </XStack>
    );
  }

  const handleDateChange = (val) => {
    if (dateOpen.name === "start")
      setFinalDate({
        ...finalDate,
        start: moment(val).format("yyyy-MM-DD")
      });
    // setSearchParams({
    //   ...searchParams,
    //   start: moment(val).format("yyyy-mm-DD")
    // });
    else
      setFinalDate({
        ...finalDate,
        end: moment(val).format("yyyy-MM-DD")
      });
    // setSearchParams({
    //   ...searchParams,
    //   end: moment(val).format("yyyy-mm-DD")
    // });
    setDateOpen({ isOpen: false, name: "" });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Transactions",
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.bg
          },
          headerTintColor: COLORS.prime_text,
          headerTitleStyle: {
            fontFamily: "JostSemiBold"
          },
          headerShadowVisible: false
        }}
      />
      <YStack mt={10} flex={1} gap={10}>
        {isFetching ? (
          <SharedSpinner />
        ) : (
          <>
            {/* date filter */}
            <XStack ai="center">
              {/* from date */}
              <MaterialCommunityIcons
                name="window-close"
                size={12}
                color={COLORS.icon}
                style={{
                  backgroundColor: COLORS.card_bg,
                  padding: 5,
                  borderRadius: 50
                }}
                onPress={() => {
                  setSearchParams({ ...searchParams, start: "" }),
                    setFinalDate({ ...finalDate, start: "" });
                }}
              />
              <Button
                size="$3"
                borderColor={COLORS.blur_border}
                ml={5}
                mr={8}
                w={110}
                px={0}
                onPress={() => setDateOpen({ isOpen: true, name: "start" })}
              >
                <Text color={COLORS.neutral_text}>
                  {finalDate.start ? finalDate.start : "Select a date"}
                </Text>
              </Button>
              {/* to date */}
              <MaterialCommunityIcons
                name="window-close"
                size={12}
                color={COLORS.icon}
                style={{
                  backgroundColor: COLORS.card_bg,
                  padding: 5,
                  borderRadius: 50
                }}
                onPress={() => {
                  setSearchParams({ ...searchParams, end: "" }),
                    setFinalDate({ ...finalDate, end: "" });
                }}
              />
              <Button
                size="$3"
                px={0}
                borderColor={COLORS.blur_border}
                ml={5}
                w={110}
                onPress={() => setDateOpen({ isOpen: true, name: "end" })}
              >
                <Text color={COLORS.neutral_text}>
                  {finalDate.end ? finalDate.end : "Select a date"}
                </Text>
              </Button>
              {/* filter Btn */}
              <Button
                size="$3"
                px={5}
                bg={
                  !finalDate.start || !finalDate.end
                    ? COLORS.blur_border
                    : COLORS.primary
                }
                ml={12}
                // w={50}
                disabled={!finalDate.start || !finalDate.end}
                onPress={() =>
                  setSearchParams({
                    ...searchParams,
                    start: finalDate.start + " 00:00:00",
                    end: finalDate.end + " 23:59:59"
                  })
                }
              >
                <MaterialCommunityIcons
                  name="filter"
                  color={"#fff"}
                  size={16}
                />
                <Text fontSize={"$4"}>Filter</Text>
              </Button>
            </XStack>
            {data.data.length === 0 ? (
              <XStack flex={1} jc={"center"} ai={"center"}>
                <Text fontSize={"$4"} color={COLORS.neutral_text}>
                  No transactions made
                </Text>
              </XStack>
            ) : (
              <>
                {/* Sort */}
                <XStack ai="center" jc="flex-end">
                  <XStack
                    gap={8}
                    onPress={() =>
                      setSearchParams({
                        ...searchParams,
                        orderBy: searchParams.orderBy === "asc" ? "desc" : "asc"
                      })
                    }
                  >
                    <Text color={COLORS.neutral_text}>
                      {searchParams.orderBy === "desc" ? "Newest" : "Oldest"}
                    </Text>
                    <FontAwesome name="sort" size={18} color={COLORS.icon} />
                  </XStack>
                </XStack>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {data?.data?.map((ele, ind) => (
                    <XStack
                      bg={COLORS.card_bg}
                      borderRadius={8}
                      // mb={10}
                      py={8}
                      pr={12}
                      pl={8}
                      jc={"space-between"}
                      key={ind}
                      mb={15}
                    >
                      <YStack gap={5} jc="center">
                        <XStack ai="center">
                          <Text
                            fontFamily={"$medium"}
                            fontSize={"$2"}
                            color={
                              ele.type === "income"
                                ? COLORS.primary
                                : COLORS.prime_red
                            }
                          >
                            {ele.type === "income" ? "+" : "-"}
                          </Text>
                          <Text
                            fontFamily={"$medium"}
                            fontSize={"$4"}
                            color={
                              ele.type === "income"
                                ? COLORS.primary
                                : COLORS.prime_red
                            }
                          >
                            <MaterialCommunityIcons
                              name="currency-inr"
                              size={16}
                              // color={COLORS.icon}
                              color={
                                ele.type === "income"
                                  ? COLORS.primary
                                  : COLORS.prime_red
                              }
                            />
                            {ele.amt}
                          </Text>
                        </XStack>
                        {/* cate and sub cate */}
                        <XStack ai={"center"} ml={18}>
                          {ele.cateName ? (
                            <>
                              <Text
                                textTransform="capitalize"
                                color={COLORS.neutral_text}
                                fontFamily={"$medium"}
                                fontSize={"$2"}
                              >
                                {ele.cateName}
                              </Text>
                              {ele.subCateName && (
                                <Text
                                  textTransform="capitalize"
                                  color={COLORS.neutral_text}
                                  fontSize={"$2"}
                                >
                                  {" -->"} {ele.subCateName}
                                </Text>
                              )}
                            </>
                          ) : (
                            <Text
                              textTransform="capitalize"
                              color={COLORS.neutral_text}
                              fontSize={"$2"}
                            >
                              {ele.type}
                            </Text>
                          )}
                        </XStack>
                      </YStack>

                      <YStack ai="flex-end" gap={8}>
                        <Text ml={4} fontSize={"$3"}>
                          {moment(ele.period).format("DD MMM YY")}
                        </Text>
                        <Action item={ele} />
                      </YStack>
                    </XStack>
                  ))}
                </ScrollView>
                <Income
                  isOpen={editIncomeOpen}
                  setIsOpen={(data) => setEditIncomeOpen(data)}
                  editData={editData}
                  setEditData={(data) => {}}
                />
              </>
            )}
          </>
        )}
      </YStack>
      <DateTimePickerModal
        isVisible={dateOpen.isOpen}
        mode="date"
        is24Hour={true}
        date={
          dateOpen.name === "start" && finalDate.start.length > 0
            ? new Date(finalDate.start)
            : dateOpen.name === "end" && finalDate.end.length > 0
            ? new Date(finalDate.end)
            : new Date()
        }
        minimumDate={
          finalDate.start.length > 0 && dateOpen.name === "end"
            ? new Date(finalDate.start)
            : new Date("2020-05-05")
        }
        maximumDate={new Date()}
        onConfirm={handleDateChange}
        onCancel={() => setDateOpen({ isOpen: false, name: "" })}
      />
      <SharedFAB open={fabOpen} onStateChange={(data) => setFabOpen(data)} />
    </>
  );
}
