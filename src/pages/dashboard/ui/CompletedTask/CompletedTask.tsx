import "./CompletedTask.css";
import { FiCheckSquare } from "react-icons/fi";
import { TaskCard } from "../../../../shared/ui/TaskCard";

// 🖼 Импорт изображений
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
        <TaskCard
          key={task.id}
          title={task.title}
          desc={task.desc}
          status="Completed"
          completedAt={task.completedAt}
          image={task.image}
          type="completed"
        />
      ))}
    </div>
  );
};
