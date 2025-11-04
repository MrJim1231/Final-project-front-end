import "./VitalTaskList.css";
import { FiAlertTriangle } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";

// 🖼 Импорт изображений
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

  return (
    <div className="vital-task-list">
      {/* === Заголовок секции === */}
      <div className="vital-task-list__header">
        <div className="vital-task-list__title-wrapper">
          <h3 className="vital-task-list__title">Vital Tasks</h3>
        </div>
      </div>

      {/* === Список карточек === */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          desc={task.desc}
          date={task.date}
          priority={task.priority as "Extreme" | "Moderate"}
          status={task.status as "Not Started" | "In Progress" | "Completed"}
          image={task.image}
        />
      ))}
    </div>
  );
};
