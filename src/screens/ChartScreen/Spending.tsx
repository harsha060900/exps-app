import React, { useState, useCallback, useEffect } from "react";
import { Stack, Text, View, XStack, YStack } from "tamagui";
// styles
import { COLORS, styles } from "@/src/constants";
// other
import moment from "moment";
// redux store
import { useGetCategoryQuery } from "@/src/store/services/categoryApi";
import { useGetPieChartQuery } from "@/src/store/services/chartApi";
// compo
import { Dropdown } from "react-native-element-dropdown";
import SharedDatePicker from "@/src/shared/SharedDatePicker";
import SharedDialog from "@/src/shared/SharedDialog";
import SharedSpinner from "@/src/shared/SharedSpinner";
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
  const [timeValue, setTimeValue] = useState({
    label: "This Month",
    value: "month"
  });
  const [timeFilter, setTimeFilter] = useState([
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Custom", value: "custom" }
  ]);
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
    if (timeValue.value === "custom")
      setTimeFilter([
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        {
          label: `${searchParams.start} - ${searchParams.end}`,
          value: "custom"
        }
      ]);
    else
      setTimeFilter([
        { label: "Today", value: "today" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
        { label: "Custom", value: "custom" }
      ]);
  }, [searchParams.start, searchParams.end]);

  const handleTimeFilter = (item: { label: string; value: string }) => {
    if (item.value === "today") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("day").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      });
      setTimeValue(item);
      return;
    } else if (item.value === "week") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("week").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      });
      setTimeValue(item);
      return;
    } else if (item.value === "month") {
      setSearchParams({
        ...searchParams,
        start: moment().startOf("month").format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      });
      setTimeValue(item);
      return;
    } else {
      setDateOpen(!isDateOpen);
      setTimeValue(item);
      return;
    }
  };

  const handleCustomDate = (day) => {
    if (
      day < searchParams.start ||
      !searchParams.start ||
      (searchParams.start && searchParams.end)
    ) {
      setSearchParams({ ...searchParams, start: day, end: "" });
    } else {
      setSearchParams({ ...searchParams, end: day });
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
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor: COLORS.blur_border,
                  flex: 1
                }
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              itemContainerStyle={{ backgroundColor: COLORS.bg }}
              itemTextStyle={{ fontSize: 16 }}
              containerStyle={styles.containerStyle}
              backgroundColor="#00000099"
              activeColor="#ffffff15"
              search={false}
              // mode="modal"
              maxHeight={400}
              labelField="label"
              valueField="value"
              renderItem={renderDropDownList}
              onChange={(item) => {
                handleTimeFilter(item);
              }}
              data={timeFilter}
              value={timeValue}
              // renderLeftIcon={() => (
              //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              // )}
            />

            {/* Category dropdown */}
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor: COLORS.blur_border,
                  flex: 1
                }
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              // iconStyle={styles.iconStyle}
              itemContainerStyle={{ backgroundColor: COLORS.bg }}
              itemTextStyle={{ fontSize: 16 }}
              containerStyle={styles.containerStyle}
              backgroundColor="#00000099"
              activeColor="#ffffff15"
              search={false}
              // mode="modal"
              maxHeight={400}
              labelField="label"
              valueField="value"
              renderItem={renderDropDownList}
              onChange={(item) => {
                setCateValue(item);
                setSearchParams({ ...searchParams, filterBy: item.value });
              }}
              data={cateList}
              value={cateValue}
              // renderLeftIcon={() => (
              //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              // )}
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
          fromDate={searchParams.start}
          toDate={searchParams.end}
          onChange={handleCustomDate}
          onClose={() => setDateOpen(false)}
        />
      </SharedDialog>
    </>
  );
}
