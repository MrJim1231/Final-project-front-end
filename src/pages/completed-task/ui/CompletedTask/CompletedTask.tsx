import "./CompletedTask.css";
import { CompletedTaskList } from "../CompletedTaskList/CompletedTaskList";

export const CompletedTask = () => {
  return (
    <section className="completed-page">
      <div className="completed-page__content">
        <div className="completed-page__left">
          <CompletedTaskList />
        </div>

        <div className="completed-page__right">
          <div className="completed-page__info">
            <h2 className="completed-page__title">Completed Tasks Overview</h2>
            <p className="completed-page__subtitle">
              Here you can review all tasks that have been successfully
              finished.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
