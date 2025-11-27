import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  selectTask,
  selectFirstTask,
  clearSelected,
} from "@/entities/task/model/tasksSlice";
import type { Todo } from "@/entities/task/api/todos";

export const useTaskSelection = (
  visibleTasks: Todo[],
  selected: Todo | null
) => {
  const dispatch = useDispatch();
  const autoSelected = useRef(false);

  useEffect(() => {
    // --- 1. Список пуст — очищаем правую панель ---
    if (visibleTasks.length === 0) {
      dispatch(clearSelected());
      autoSelected.current = false;
      return;
    }

    // --- 2. Если выбранная задача исчезла — выбираем первую ---
    if (selected && !visibleTasks.some((t) => t.id === selected.id)) {
      dispatch(selectFirstTask(visibleTasks));
      autoSelected.current = true;
      return;
    }

    // --- 3. Если ничего не выбрано — выбираем первую ---
    if (!selected && !autoSelected.current) {
      dispatch(selectFirstTask(visibleTasks));
      autoSelected.current = true;
      return;
    }
  }, [visibleTasks, selected, dispatch]);

  // --- ручной выбор ---
  return useCallback(
    (task: Todo) => {
      autoSelected.current = true;
      dispatch(selectTask(task));
    },
    [dispatch]
  );
};
