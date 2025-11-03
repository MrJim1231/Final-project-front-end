import "./VitalTask.css";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";

export const VitalTask = () => {
  return (
    <section className="vital-page">
      <div className="vital-page__header">
        {/* 👇 Секция со списком задач */}
        <VitalTaskList />
      </div>
    </section>
  );
};
