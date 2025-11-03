import "./VitalTask.css";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { VitalTaskDetails } from "../VitalTaskDetails/VitalTaskDetails";

export const VitalTask = () => {
  return (
    <section className="vital-page">
      <div className="vital-page__content">
        <div className="vital-page__left">
          <VitalTaskList />
        </div>
        <div className="vital-page__right">
          <VitalTaskDetails />
        </div>
      </div>
    </section>
  );
};
