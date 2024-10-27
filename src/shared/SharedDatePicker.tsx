import React, { memo, useState } from "react";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

type DateTimeProps = {
  mode: string;
};
// const SharedDatePicker = memo(function SharedDatePicker({
const SharedDatePicker = ({
  fromDate,
  toDate,
  mode,
  onChange,
  onClose
}) =>{
  const [selected, setSelected] = useState({ from: "", to: "" });
//   console.log("daraaaa", fromDate, toDate);
  return (
    <>
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
      />
    </>
  );
}

export default SharedDatePicker;
