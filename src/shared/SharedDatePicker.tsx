import React, { memo, useState } from "react";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";

const SharedDatePicker = memo(function SharedDatePicker({
  fromDate,
  toDate,
  mode,
  onChange
}) {
  return (
    <Calendar
      onDayPress={(day) => {
        onChange(day.dateString);
      }}
      markingType={"multi-dot"}
      markedDates={{
        [fromDate]: {
          selected: true,
          startingDay: true,
          color: "green",
          textColor: "gray"
        },
        [toDate]: {
          selected: true,
          endingDay: true,
          color: "green",
          textColor: "gray"
        }
      }}
      maxDate={moment().format("YYYY-MM-DD")}
      enableSwipeMonths={true}
    />
  );
});

export default SharedDatePicker;
