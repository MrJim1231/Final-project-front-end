import "./Dashboard.css";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { TodoList } from "../TodoList/TodoList";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { CompletedTask } from "../CompletedTask/CompletedTask"; // 👈 новый импорт

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <DashboardHeader />

      <div className="dashboard-page__content">
        <div className="dashboard-page__left">
          <TodoList />
        </div>

        <div className="dashboard-page__right">
          <TaskStatus />

          {/* 👇 добавляем CompletedTask под статистикой */}
          <CompletedTask />
        </div>
      </div>
    </div>
  );
};
