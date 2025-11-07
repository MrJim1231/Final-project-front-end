import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { TaskCard } from "../../../../shared/ui/TaskCard";
import { AddTaskModal } from "../AddTaskModal/AddTaskModal";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  removeTask,
  updateTaskStatus,
} from "../../../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../../../app/providers/store";
import { useDateContext } from "../../../../shared/context/DateContext";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks, loading } = useSelector(
    (state: RootState) => state.tasks
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedDate } = useDateContext();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteTask = (id: string) => {
    dispatch(removeTask(id));
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    dispatch(updateTaskStatus({ id, status: newStatus }));
  };

  if (loading) return <p>Loading tasks...</p>;

  const visibleTasks = tasks.filter((t) => {
    const taskDate = new Date(t.createdAt).toISOString().split("T")[0];
    return taskDate === selectedDate && !t.vital && t.status !== "Completed";
  });

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <div className="todo-list__title-wrapper">
          <FiClipboard className="todo-list__icon" />
          <h3 className="todo-list__title">To-Do</h3>
        </div>
        <button className="todo-list__add" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add task
        </button>
      </div>

      {visibleTasks.length > 0 ? (
        visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            desc={task.description}
            date={new Date(task.createdAt).toLocaleDateString()}
            priority={task.priority}
            status={task.status}
            image={task.image}
            vital={task.vital}
            onDelete={() => handleDeleteTask(task.id)}
            onStatusUpdate={(id, s) => handleStatusUpdate(id, s)}
          />
        ))
      ) : (
        <p>No tasks for this date 🎯</p>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
};
