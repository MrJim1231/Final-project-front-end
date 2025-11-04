import "./MyTaskList.css";
import { TaskCard } from "../../../../shared/ui/TaskCard";

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

  return (
    <div className="my-task-list">
      <div className="my-task-list__header">
        <h3 className="my-task-list__title">My Tasks</h3>
      </div>

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
