import React, { useEffect, useState } from "react";
import {
  XStack,
  Text,
  YStack,
  View,
  Button,
  Separator,
  ScrollView,
  ToggleGroup
} from "tamagui";
import { Stack, router } from "expo-router";
import moment from "moment";
// icons
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
//styels
import { COLORS } from "@/src/constants";
// redux
import {
  useDeleteExpenseMutation,
  useGetExpenseQuery
} from "@/src/store/services/expenseApi";
import { useDispatch, useSelector } from "react-redux";
import { expenseState, setExpenseEdit } from "@/src/store/slices/expenseSlice";
// other compo
import SharedSpinner from "@/src/shared/SharedSpinner";
import SharedFAB from "@/src/shared/SharedFAB";
import { SharedToast } from "@/src/shared/SharedToast";
import Income from "@/src/components/Income";
import SharedDialog from "@/src/shared/SharedDialog";
import SharedDropdown from "@/src/shared/SharedDropdown";
import SharedDatePicker from "@/src/shared/SharedDatePicker";
import { SharedToggle, SharedToggleItem } from "@/src/shared/SharedToggle";

export default function TransactionScreen() {
  const [fabOpen, setFabOpen] = useState(false);
  const [editIncomeOpen, setEditIncomeOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const [searchParams, setSearchParams] = useState({
    orderBy: "desc",
    start: moment().startOf("month").format("YYYY-MM-DD"),
    end: moment().endOf("month").format("YYYY-MM-DD"),
    type:"all"
  });
  const [dateFilter, setDateFilter] = useState([
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Custom", value: "custom" }
  ]);
  const [dateFilterValue, setDateFilterValue] = useState({
    label: "This Month",
    value: "month"
  });
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateValue, setDateValue] = useState({ start: "", end: "" });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dateOpen, setDateOpen] = useState(false);
  const { data, isFetching } = useGetExpenseQuery(searchParams);
  const [deleteExpense] = useDeleteExpenseMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateFilterValue.value === "custom")
      setDateFilter([
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        {
          label: `${dateValue.start} - ${dateValue.end}`,
          value: "custom"
        }
      ]);
    else {
      setDateFilter([
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "Custom", value: "custom" }
      ]);
      setDateValue({ start: "", end: "" });
    }
  }, [searchParams.start, searchParams.end]);

  async function handleDelExp(id: number) {
    try {
      const res = await deleteExpense(id);
      SharedToast(res?.data?.message, COLORS.success, COLORS.primary);
    } catch (err) {
      console.log("err:", err);
      // SharedToast(err, COLORS.error)
    }
  }

  const handleTypeFilter=(val)=>{
    setTypeFilter(val)
    setSearchParams({...searchParams, type:val})
  }

  const handleTimeFilter = (item: { label: string; value: string }) => {
    if (item.value === "today") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        end: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
      });
      setDateFilterValue(item);
      return;
    } else if (item.value === "week") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
        end: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
      });
      setDateFilterValue(item);
      return;
    } else if (item.value === "month") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        end: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
      });
      setDateFilterValue(item);
      return;
    } else {
      setDateOpen(!dateOpen);
      setDateFilterValue(item);
      return;
    }
  };

  const handleCustomDate = (day) => {
    if (
      day < dateValue.start ||
      !dateValue.start ||
      (dateValue.start && dateValue.end)
    ) {
      setDateValue({ start: day, end: "" });
    } else {
      setDateValue({ ...dateValue, end: day });
      setSearchParams({ ...searchParams, start: dateValue.start+" 00:00:00", end: day+" 23:59:59" });
      setDateOpen(false);
    }
  };

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

        <View
          onPress={() => {
            setDeleteId(item.item.id);
            setDeleteOpen(true);
          }}
        >
          <FontAwesome name="trash" size={20} color={COLORS.prime_red} />
        </View>
      </XStack>
    );
  }

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
          headerShadowVisible: false,
          headerRight: () => (
            <XStack width={"85%"} pr={20}>
              <SharedDropdown
                data={dateFilter}
                value={dateFilterValue}
                onChange={handleTimeFilter}
              />
            </XStack>
          )
        }}
      />
      <YStack mt={10} flex={1} gap={10}>
        {isFetching ? (
          <SharedSpinner />
        ) : (
          <>
            {/* date filter */}

            {data.data.length === 0 ? (
              <XStack flex={1} jc={"center"} ai={"center"}>
                <Text fontSize={"$4"} color={COLORS.neutral_text}>
                  No transactions made
                </Text>
              </XStack>
            ) : (
              <>
                <XStack ai="center" jc="space-between">
                  {/* filter toggle */}
                  <ToggleGroup
                    type="single"
                    size={'$3'}
                    value={typeFilter}
                    onValueChange={(val) => {
                      handleTypeFilter(val)
                    }}
                    disableDeactivation
                    
                  >
                    <ToggleGroup.Item borderColor={COLORS.primary} value="income" bg={typeFilter=='income' ? COLORS.primary : 'transparent'}>
                      <Text>Income</Text>
                    </ToggleGroup.Item >
                    <ToggleGroup.Item  borderTopColor={COLORS.primary} borderBottomColor={COLORS.primary} value="all" bg={typeFilter=='all' ? COLORS.primary : 'transparent'}>
                      <Text>All</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="expense"  borderColor={COLORS.primary} bg={typeFilter=='expense' ? COLORS.primary : 'transparent'}>
                      <Text>Expense</Text>
                    </ToggleGroup.Item>
                  </ToggleGroup>
                  {/* Sort */}
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
      {/* Delete Modal */}
      <SharedDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
        }}
        title="Delete Transaction"
      >
        <Text>Are you sure to delete</Text>
      </SharedDialog>
      {/* Date Picker */}
      <SharedDialog
        open={dateOpen}
        onClose={() => {
          setDateOpen(false);
        }}
      >
        <SharedDatePicker
          mode="date"
          fromDate={dateValue.start}
          toDate={dateValue.end}
          onChange={handleCustomDate}
        />
      </SharedDialog>
      <SharedFAB open={fabOpen} onStateChange={(data) => setFabOpen(data)} />
    </>
  );
}