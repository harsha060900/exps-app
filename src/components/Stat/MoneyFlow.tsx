import React, { useState, useEffect } from "react";
import { Text, View, XStack } from "tamagui";
// other
import moment from "moment";
// compo
import SharedDatePicker from "@/src/shared/SharedDatePicker";
import SharedDialog from "@/src/shared/SharedDialog";
import SharedSpinner from "@/src/shared/SharedSpinner";
import SharedDropdown from "@/src/shared/SharedDropdown";

const MoneyFlow = () => {
  const [searchParams, setSearchParams] = useState({
    filterBy: "",
    start: moment().startOf("month").format("YYYY-MM-DD"),
    end: moment().endOf("day").format("YYYY-MM-DD")
  });
  const [isDateOpen, setDateOpen] = useState(false);
  const [dateValue, setDateValue] = useState({ start: "", end: "" });
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
  return (
    <>
      <Text fontSize={"$7"} fontFamily={"$heading"} mb={10}>
        Money Flow
      </Text>
      <XStack gap={20}>
        <SharedDropdown
          data={timeFilter}
          value={periodValue}
          onChange={handleTimeFilter}
        />
      </XStack>

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
};

export default MoneyFlow;
