import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { useEffect, useState, useMemo } from "react";

import { TaskCard } from "../../entities/task/TaskCard";
import { AddTaskModal } from "../../entities/task/ui/AddTaskModal/AddTaskModal";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addNewTask } from "../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../app/providers/store";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: tasks,
    loading,
    selectedDate,
    searchQuery,
  } = useSelector((state: RootState) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // === загрузка задач ===
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // === добавление новой задачи ===
  const handleAddTask = (taskData: any) => {
    dispatch(
      addNewTask({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority || "Low",
        status: "Not Started",
        image: taskData.imageUrl || taskData.image || "",
        vital: false,
      })
    );
  };

  const matchSearch = (t: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  };

  // === видимые задачи ===
  const visibleTasks = useMemo(() => {
    if (searchQuery.trim()) {
      return tasks
        .filter((t) => !t.vital && t.status !== "Completed" && matchSearch(t))
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        .slice(0, 3);
    }

    return tasks
      .filter((t) => {
        const d = t.createdAt.split("T")[0];
        return (
          d === selectedDate &&
          !t.vital &&
          t.status !== "Completed" &&
          matchSearch(t)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .slice(0, 3);
  }, [tasks, selectedDate, searchQuery]);

  // === fallback ===
  const fallback = useMemo(() => {
    if (visibleTasks.length > 0) return null;

    const filtered = tasks.filter(
      (t) => !t.vital && t.status !== "Completed" && matchSearch(t)
    );
    if (filtered.length === 0) return null;

    const sorted = filtered.sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );

    const lastDate = sorted[0].createdAt.split("T")[0];

    if (!searchQuery.trim() && lastDate === selectedDate) return null;

    return {
      date: lastDate,
      tasks: sorted.filter((t) => t.createdAt.startsWith(lastDate)).slice(0, 3),
    };
  }, [tasks, selectedDate, searchQuery, visibleTasks]);

  const current = new Date(selectedDate);
  const day = current.getDate();
  const month = current.toLocaleString("en-US", { month: "long" });
  const isToday =
    new Date().toISOString().split("T")[0] === selectedDate ? "· Today" : "";

  if (loading) return <p>Loading tasks...</p>;

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

      <div className="todo-list__date">
        {day} {month} <span className="todo-list__today">{isToday}</span>
      </div>

      {visibleTasks.length > 0 ? (
        <div className="todo-list__tasks">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              date={new Date(task.createdAt).toLocaleDateString()}
              priority={task.priority}
              status={task.status}
              image={task.image}
              vital={task.vital}
              showAlert
              enableDesktopModal
            />
          ))}
        </div>
      ) : (
        <p className="todo-list__empty">No tasks for this date 🎯</p>
      )}

      {fallback && (
        <div className="todo-list__fallback">
          <div className="todo-list__fallback-date">
            {new Date(fallback.date).getDate()}{" "}
            {new Date(fallback.date).toLocaleString("en-US", { month: "long" })}
          </div>

          <div className="todo-list__tasks">
            {fallback.tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                date={new Date(task.createdAt).toLocaleDateString()}
                priority={task.priority}
                status={task.status}
                image={task.image}
                vital={task.vital}
                showAlert
                enableDesktopModal
              />
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}
    </div>
  );
};
