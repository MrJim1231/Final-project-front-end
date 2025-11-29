// src/entities/task/model/selectors.ts
import { RootState } from "@/app/store";

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectSelectedTask = (state: RootState) => state.tasks.selected;
