import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { selectTask, selectFirstTask } from "@/entities/task/model/tasksSlice";
import type { Todo } from "@/entities/task/api/todos";

export const useTaskSelection = (visibleTasks: Todo[]) => {
  const dispatch = useDispatch();

  // флаг: автоматический выбор уже был выполнен
  const autoSelected = useRef(false);

  // === авто-выбор (делается только 1 раз при каждом обновлении списка)
  useEffect(() => {
    if (!autoSelected.current && visibleTasks.length > 0) {
      dispatch(selectFirstTask(visibleTasks));
      autoSelected.current = true;
    }
  }, [visibleTasks, dispatch]);

  // === выбор при клике
  return useCallback(
    (task: Todo) => {
      autoSelected.current = true; // чтобы авто-выбор не перебил ручной
      dispatch(selectTask(task));
    },
    [dispatch]
  );
};
