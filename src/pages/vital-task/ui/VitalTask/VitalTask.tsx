import "./VitalTask.css";
import { useSelector } from "react-redux";
import { VitalTaskList } from "../VitalTaskList/VitalTaskList";
import { TaskDetails } from "../../../../entities/task/ui/TaskDetails/TaskDetails";
import type { RootState } from "../../../../app/providers/store";

export const VitalTask = () => {
  const { selected } = useSelector((state: RootState) => state.tasks);

  return (
    <section className="vital-page">
      <div className="vital-page__content">
        <div className="vital-page__left">
          <VitalTaskList />
        </div>

        <div className="vital-page__right">
          {selected ? (
            <TaskDetails
              image={selected.image}
              title={selected.title}
              priority={selected.priority}
              status={selected.status}
              date={new Date(selected.createdAt).toLocaleDateString()}
              description={selected.description}
              completedAt={selected.completedAt}
            />
          ) : (
            <p className="vital-page__placeholder">
              📁 Select a task to see details
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
