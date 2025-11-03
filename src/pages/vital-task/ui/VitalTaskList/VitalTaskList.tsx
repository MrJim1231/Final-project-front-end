import "./VitalTaskList.css";
import { FiAlertTriangle } from "react-icons/fi";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

import task1 from "../../../../shared/assets/images/vital-task/dog.png";
import task2 from "../../../../shared/assets/images/vital-task/hospital.png";

export const VitalTaskList = () => {
  const tasks = [
    {
      id: 1,
      title: "Walk the dog",
      desc: "Take the dog to the park and bring treats as well…..",
      date: "20/06/2023",
      priority: "Extreme",
      status: "Not Started",
      image: task1,
    },
    {
      id: 2,
      title: "Take grandma to hospital",
      desc: "Go back home and take grandma to the hosp…..",
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
    <div className="vital-task-list">
      <div className="vital-task-list__header">
        <div className="vital-task-list__title-wrapper">
          <FiAlertTriangle className="vital-task-list__icon" />
          <h3 className="vital-task-list__title">Vital Tasks</h3>
        </div>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="vital-card">
          <IoEllipsisHorizontalOutline className="vital-card__menu" />

          <div className="vital-card__main">
            <div className="vital-card__left">
              <div className="vital-card__header">
                <span
                  className="vital-card__circle"
                  style={{ borderColor: getStatusColor(task.status) }}
                ></span>
                <h4 className="vital-card__title">{task.title}</h4>
              </div>

              <p className="vital-card__desc">{task.desc}</p>

              <div className="vital-card__bottom">
                <span>
                  Priority:{" "}
                  <span className="vital-card__priority">{task.priority}</span>
                </span>
                <span
                  className={`vital-card__status ${
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

            <div className="vital-card__right">
              <img
                src={task.image}
                alt={task.title}
                className="vital-card__img"
              />
              <span className="vital-card__date">Created on: {task.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
