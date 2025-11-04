import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";

// 🖼 Импорт изображений
import todo1 from "../../../../shared/assets/images/dashboard/todo1.png";
import todo2 from "../../../../shared/assets/images/dashboard/todo2.png";
import todo3 from "../../../../shared/assets/images/dashboard/todo3.png";

export const TodoList = () => {
  const tasks = [
    {
      id: 1,
      title: "Attend Nischal’s Birthday Party",
      desc: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
      date: "20/06/2023",
      priority: "Moderate",
      status: "Not Started",
      image: todo1,
    },
    {
      id: 2,
      title: "Landing Page Design for TravelDays",
      desc: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
      date: "19/06/2023",
      priority: "Moderate",
      status: "In Progress",
      image: todo2,
    },
    {
      id: 3,
      title: "Presentation on Final Product",
      desc: "Make sure everything is functioning and get the documents ready.",
      date: "18/06/2023",
      priority: "High",
      status: "Completed",
      image: todo3,
    },
  ];

  return (
    <div className="todo-list">
      {/* === Заголовок секции === */}
      <div className="todo-list__header">
        <div className="todo-list__title-wrapper">
          <FiClipboard className="todo-list__icon" />
          <h3 className="todo-list__title">To-Do</h3>
        </div>

        <button className="todo-list__add">
          <span className="todo-list__add-icon">
            <FiPlus />
          </span>
          Add task
        </button>
      </div>

      {/* === Дата под заголовком === */}
      <div className="todo-list__date-section">
        <span className="todo-list__day">20 June</span>
        <span className="todo-list__dot">•</span>
        <span className="todo-list__today">Today</span>
      </div>

      {/* === Карточки === */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          desc={task.desc}
          date={task.date}
          priority={task.priority as "Moderate" | "High"}
          status={task.status as "Not Started" | "In Progress" | "Completed"}
          image={task.image}
        />
      ))}
    </div>
  );
};
