import "./TodoList.css";
import { FiClipboard, FiPlus, FiMoreHorizontal } from "react-icons/fi"; // 👈 иконки

// ✅ Импорт локальных изображений
import todo1 from "../../../../shared/assets/images/dashboard/todo1.png";
import todo2 from "../../../../shared/assets/images/dashboard/todo2.png";
import todo3 from "../../../../shared/assets/images/dashboard/todo3.png";

export const TodoList = () => {
  const tasks = [
    {
      title: "Attend Nischal’s Birthday Party",
      desc: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
      date: "20/06/2023",
      priority: "High",
      status: "Not Started",
      image: todo1,
    },
    {
      title: "Landing Page Design for TravelDays",
      desc: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
      date: "19/06/2023",
      priority: "Moderate",
      status: "In Progress",
      image: todo2,
    },
    {
      title: "Presentation on Final Product",
      desc: "Make sure everything is functioning and get the documents ready.",
      date: "18/06/2023",
      priority: "Moderate",
      status: "Completed",
      image: todo3,
    },
  ];

  // 🎨 Функция возвращает цвет кружка по статусу
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "#ff4444"; // красный
      case "In Progress":
        return "#007bff"; // синий
      case "Completed":
        return "#00c851"; // зелёный
      default:
        return "#ccc";
    }
  };

  return (
    <div className="todo-list">
      {/* === Заголовок списка === */}
      <div className="todo-list__header">
        <div className="todo-list__title-wrapper">
          <FiClipboard className="todo-list__icon" />
          <h3 className="todo-list__title">To-Do</h3>
        </div>

        {/* === Кнопка добавления === */}
        <button className="todo-list__add">
          <span className="todo-list__add-icon">
            <FiPlus />
          </span>
          Add task
        </button>
      </div>

      {/* === Список задач === */}
      {tasks.map((task, i) => (
        <div key={i} className="todo-card">
          {/* ⋯ три точки поверх карточки */}
          <FiMoreHorizontal className="todo-card__menu" />

          <div className="todo-card__content">
            <div className="todo-card__header">
              {/* 🔘 Кружок цвета статуса */}
              <span
                className="todo-card__circle"
                style={{ borderColor: getStatusColor(task.status) }}
              ></span>

              <h4 className="todo-card__title">{task.title}</h4>
            </div>

            <p className="todo-card__desc">{task.desc}</p>

            <div className="todo-card__meta">
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

            <span className="todo-card__date">Created on: {task.date}</span>
          </div>

          <img src={task.image} alt={task.title} className="todo-card__img" />
        </div>
      ))}
    </div>
  );
};
