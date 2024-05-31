import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editExpense: {
    id: null,
    cate_id: null,
    sub_cate_id: null,
    amt: null,
    period: "",
    desc: ""
  }
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenseEdit: (state, action) => {
      //   console.log("slice", state, action);
      state.editExpense = action.payload.item;
    }
  }
});

export const { setExpenseEdit } = expenseSlice.actions;
export const expenseState = (state: any) => state.expense;
export default expenseSlice.reducer;
