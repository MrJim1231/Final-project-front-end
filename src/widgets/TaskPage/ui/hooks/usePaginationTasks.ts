import { useMemo, useEffect } from "react";
import { setTotalPages } from "@/entities/task/model/paginationSlice";
import { useDispatch } from "react-redux";
import type { Todo } from "@/entities/task/api/todos";

export const usePaginationTasks = (
  filteredTasks: Todo[],
  page: number,
  limit: number,
  type: "my" | "vital" | "completed"
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const pages = Math.ceil(filteredTasks.length / limit) || 1;
    dispatch(setTotalPages({ type, totalPages: pages }));
  }, [filteredTasks, limit, type, dispatch]);

  return useMemo(() => {
    const start = (page - 1) * limit;
    return filteredTasks.slice(start, start + limit);
  }, [filteredTasks, page, limit]);
};
