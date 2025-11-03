import "./MyTask.css";
import { MyTaskList } from "../MyTaskList/MyTaskList";
import { MyTaskDetails } from "../MyTaskDetails/MyTaskDetails";

export const MyTask = () => {
  return (
    <section className="my-task-page">
      <div className="my-task-page__content">
        <div className="my-task-page__left">
          <MyTaskList />
        </div>
        <div className="my-task-page__right">
          <MyTaskDetails />
        </div>
      </div>
    </section>
  );
};
