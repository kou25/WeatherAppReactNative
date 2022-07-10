import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OriginState {
  value: string | null;
}

const initialState: OriginState = {
  value: null
};

export const originSlice = createSlice({
  name: "origin",
  initialState,
  reducers: {
    setOrigin: (state: OriginState, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setOrigin } = originSlice.actions;

//Selector
export const selectOrigin = (state: any) => state.country.value;

export default originSlice.reducer;
