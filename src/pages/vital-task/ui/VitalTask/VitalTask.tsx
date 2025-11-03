import "./VitalTask.css";
import { VitalTaskList } from "../VitalTaskList";

export const VitalTask = () => {
  return (
    <section className="vital-page">
      <div className="vital-page__header">
        <h2 className="vital-page__title">Vital Tasks</h2>
        <p className="vital-page__subtitle">
          Here will be your most important tasks.
        </p>
      </div>

      {/* 👇 Секция со списком задач */}
      <VitalTaskList />
    </section>
  );
};
