import "./MyTaskList.css";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

// 🖼 Импорт изображений
import task1 from "../../../../shared/assets/images/my-task/docs.png";
import task2 from "../../../../shared/assets/images/my-task/study.png";

export const MyTaskList = () => {
  const tasks = [
    {
      id: 1,
      title: "Submit Documents",
      desc: "Make sure to submit all the necessary documents…..",
      date: "20/06/2023",
      priority: "Extreme",
      status: "Not Started",
      image: task1,
    },
    {
      id: 2,
      title: "Complete assignments",
      desc: "The assignments must be completed to pass final year…..",
      date: "20/06/2023",
      priority: "Moderate",
      status: "In Progress",
      image: task2,
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
    <div className="my-task-list">
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="my-card">
          <IoEllipsisHorizontalOutline className="my-card__menu" />

          <div className="my-card__main">
            <div className="my-card__left">
              <div className="my-card__header">
                <span
                  className="my-card__circle"
                  style={{ borderColor: getStatusColor(task.status) }}
                ></span>
                <h4 className="my-card__title">{task.title}</h4>
              </div>

              <p className="my-card__desc">{task.desc}</p>

              <div className="my-card__bottom">
                <span>
                  Priority:{" "}
                  <span className="my-card__priority">{task.priority}</span>
                </span>
                <span
                  className={`my-card__status ${
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

            <div className="my-card__right">
              <img src={task.image} alt={task.title} className="my-card__img" />
              <span className="my-card__date">Created on: {task.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
