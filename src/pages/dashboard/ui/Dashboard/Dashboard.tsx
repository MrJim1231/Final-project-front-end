import "./Dashboard.css";
import { DashboardHeader } from "../../../../widgets/DashboardHeader/DashboardHeader";
import { TodoList } from "../../../../widgets/TodoList";
import { TaskStatus } from "../../../../widgets/TaskStatus";
import { CompletedTask } from "../../../../widgets/CompletedTask"; // 👈 новый импорт

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
