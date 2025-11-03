import "./CompletedTask.css";
import { FiCheckSquare } from "react-icons/fi";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

import dogImg from "../../../../shared/assets/images/dashboard/dog.png";
import meetingImg from "../../../../shared/assets/images/dashboard/meeting.png";

export const CompletedTask = () => {
  const tasks = [
    {
      id: 1,
      title: "Walk the dog",
      desc: "Take the dog to the park and bring treats as well.",
      completedAt: "2 days ago",
      image: dogImg,
    },
    {
      id: 2,
      title: "Conduct meeting",
      desc: "Meet with the client and finalize requirements.",
      completedAt: "2 days ago",
      image: meetingImg,
    },
  ];

  return (
    <div className="completed-task">
      {/* === Заголовок блока === */}
      <div className="completed-task__header">
        <div className="completed-task__title-wrapper">
          <FiCheckSquare className="completed-task__icon" />
          <h3 className="completed-task__title">Completed Task</h3>
        </div>
      </div>

      {/* === Список карточек === */}
      {tasks.map((task) => (
        <div key={task.id} className="completed-card">
          <IoEllipsisHorizontalOutline className="completed-card__menu" />

          <div className="completed-card__main">
            {/* Левая часть */}
            <div className="completed-card__left">
              <div className="completed-card__header">
                <span
                  className="completed-card__circle"
                  style={{ borderColor: "#00C851" }}
                ></span>
                <h4 className="completed-card__title">{task.title}</h4>
              </div>

              <p className="completed-card__desc">{task.desc}</p>

              <div className="completed-card__bottom">
                <span className="completed-card__status">
                  Status: <span className="status--green">Completed</span>
                </span>
                <span className="completed-card__date">
                  Completed {task.completedAt}.
                </span>
              </div>
            </div>

            {/* Правая часть (картинка) */}
            <div className="completed-card__right">
              <img
                src={task.image}
                alt={task.title}
                className="completed-card__img"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
