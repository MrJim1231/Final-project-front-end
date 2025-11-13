import { useEffect } from "react";
import type { Todo } from "@/entities/task/api/todos";
import { useDispatch } from "react-redux";
import { selectFirstTask, selectTask } from "@/entities/task/model/tasksSlice";

export const useTaskSelection = (tasks: Todo[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tasks.length > 0) {
      dispatch(selectFirstTask(tasks));
    }
  }, [tasks, dispatch]);

  return (task: Todo) => dispatch(selectTask(task));
};
