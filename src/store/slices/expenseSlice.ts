import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../actions";

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
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

export const { setExpenseEdit } = expenseSlice.actions;
export const expenseState = (state: any) => state.expense;
export default expenseSlice.reducer;
