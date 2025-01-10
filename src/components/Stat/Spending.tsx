import React, { useState, useEffect } from "react";
import { Text, View, XStack } from "tamagui";
// styles
import { COLORS, styles } from "@/src/constants";
// other
import moment from "moment";
// redux store
import { useGetCategoryQuery } from "@/src/store/services/categoryApi";
import { useGetPieChartQuery } from "@/src/store/services/chartApi";
// compo
import SharedDatePicker from "@/src/shared/SharedDatePicker";
import SharedDialog from "@/src/shared/SharedDialog";
import SharedSpinner from "@/src/shared/SharedSpinner";
import SharedDropdown from "@/src/shared/SharedDropdown";
import PieChart from "@/src/shared/charts/PieChart";

export default function Spending() {
  const [searchParams, setSearchParams] = useState({
    filterBy: "",
    start: moment().startOf("month").format("YYYY-MM-DD"),
    end: moment().endOf("day").format("YYYY-MM-DD")
  });
  const { data: pieChartData, isFetching: chartLoading } =
    useGetPieChartQuery(searchParams);
  const { data: cateData, isFetching } = useGetCategoryQuery("");

  const [isDateOpen, setDateOpen] = useState(false);
  const [periodValue, setPeriodValue] = useState({
    label: "This Month",
    value: "month"
  });
  const [timeFilter, setTimeFilter] = useState([
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Custom", value: "custom" }
  ]);
  const [dateValue, setDateValue] = useState({ start: "", end: "" });
  const [cateValue, setCateValue] = useState({ label: "All", value: "" });
  const [cateList, setCateList] = useState([{ label: "All", value: "" }]);
  
  useEffect(() => {
    if (cateData?.data) {
      let res = cateData?.data?.map((ele) => ({
        label: ele.cate_name,
        value: ele.id
      }));
      setCateList((prev) => [{ label: "All", value: "" }, ...res]);
    }
  }, [cateData]);

  useEffect(() => {
    if (periodValue.value === "custom")
      setTimeFilter([
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        {
          label: `${searchParams.start} - ${searchParams.end}`,
          value: "custom"
        }
      ]);
    else {
      setDateValue({ start: "", end: "" });
      setTimeFilter([
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "Custom", value: "custom" }
      ]);
    }
  }, [searchParams.start, searchParams.end]);

  const handleTimeFilter = (item: { label: string; value: string }) => {
    if (item.value === "today") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("day").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      });
      setPeriodValue(item);
      return;
    } else if (item.value === "week") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("week").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      });
      setPeriodValue(item);
      return;
    } else if (item.value === "month") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("month").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      });
      setPeriodValue(item);
      return;
    } else {
      setDateOpen(!isDateOpen);
      setPeriodValue(item);
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
      setSearchParams({ ...searchParams, start: dateValue.start, end: day });
      setDateOpen(false);
    }
  };

  // const handleCustomDate=useCallback((val)=>{
  //   console.log('c:',val);

  // },[])

  const renderDropDownList = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <Text fontSize={"$7"} fontFamily={"$heading"} mb={10}>
        Spending
      </Text>
      {isFetching || chartLoading ? (
        <SharedSpinner />
      ) : (
        <View>
          <XStack gap={20}>
            <SharedDropdown
              data={timeFilter}
              value={periodValue}
              onChange={handleTimeFilter}
            />
            {/* Category dropdown */}
            <SharedDropdown
              data={cateList}
              value={cateValue}
              onChange={(item) => {
                setCateValue(item);
                setSearchParams({ ...searchParams, filterBy: item.value });
              }}
            />
          </XStack>
          <PieChart data={pieChartData} filter={searchParams.filterBy} />
        </View>
      )}

      {/* Date Picker */}
      <SharedDialog
        open={isDateOpen}
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
    </>
  );
}
