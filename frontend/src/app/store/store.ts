import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/entities/task/model/tasksSlice";
import paginationReducer from "@/entities/task/model/paginationSlice";
import userReducer from "@/entities/user/model/userSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    pagination: paginationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
