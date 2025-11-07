// src/app/providers/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../../../entities/task/model/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
