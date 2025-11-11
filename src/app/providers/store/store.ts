import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/entities/task/model/tasksSlice";
import paginationReducer from "@/entities/task/model/paginationSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
