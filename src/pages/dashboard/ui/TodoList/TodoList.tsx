import "./TodoList.css";
import "./TodoList.css";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { IoEllipsisHorizontalOutline } from "react-icons/io5"; // 👈 правильный пакет!

// ✅ Импорт изображений
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "#ff4444";
      case "In Progress":
        return "#007bff";
      case "Completed":
        return "#00c851";
      default:
        return "#ccc";
    }
  };

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
        <div key={task.id} className="todo-card">
          <IoEllipsisHorizontalOutline className="todo-card__menu" />

          <div className="todo-card__main">
            {/* Левая часть */}
            <div className="todo-card__left">
              <div className="todo-card__header">
                <span
                  className="todo-card__circle"
                  style={{ borderColor: getStatusColor(task.status) }}
                ></span>
                <h4 className="todo-card__title">{task.title}</h4>
              </div>
              <p className="todo-card__desc">{task.desc}</p>

              <div className="todo-card__bottom">
                <span>
                  Priority:{" "}
                  <span className="todo-card__priority">{task.priority}</span>
                </span>
                <span
                  className={`todo-card__status ${
                    task.status === "Not Started"
                      ? "status--red"
                      : task.status === "In Progress"
                      ? "status--blue"
                      : "status--green"
                  }`}
                >
                  Status: {task.status}
                </span>
              </div>
            </div>

            {/* Правая часть (картинка + дата) */}
            <div className="todo-card__right">
              <img
                src={task.image}
                alt={task.title}
                className="todo-card__img"
              />
              <span className="todo-card__date">Created on: {task.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
