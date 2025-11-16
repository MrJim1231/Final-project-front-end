import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  my: { page: number; limit: number; totalPages: number };
  vital: { page: number; limit: number; totalPages: number };
  completed: { page: number; limit: number; totalPages: number };
}

const initialState: PaginationState = {
  my: { page: 1, limit: 3, totalPages: 1 },
  vital: { page: 1, limit: 3, totalPages: 1 },
  completed: { page: 1, limit: 3, totalPages: 1 },
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<{
        type: "my" | "vital" | "completed";
        page: number;
      }>
    ) => {
      state[action.payload.type].page = action.payload.page;
    },
    setTotalPages: (
      state,
      action: PayloadAction<{
        type: "my" | "vital" | "completed";
        totalPages: number;
      }>
    ) => {
      state[action.payload.type].totalPages = action.payload.totalPages;
    },
  },
});

export const { setPage, setTotalPages } = paginationSlice.actions;
export default paginationSlice.reducer;
