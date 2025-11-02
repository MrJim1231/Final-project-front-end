// src/pages/dashboard/ui/Dashboard.tsx
import "./Dashboard.css";

const users = [
  "/avatars/u1.jpg",
  "/avatars/u2.jpg",
  "/avatars/u3.jpg",
  "/avatars/u4.jpg",
];

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h2 className="dashboard-page__title">
          Welcome back, <span>Sundar</span> 👋
        </h2>

        <div className="dashboard-page__team">
          <div className="dashboard-page__avatars">
            {users.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="user"
                className="dashboard-page__avatar"
                style={{ left: `${i * 20}px` }}
              />
            ))}
          </div>

          <button className="dashboard-page__invite">➕ Invite</button>
        </div>
      </div>

      {/* Здесь можно добавить другие блоки: статистику, задачи и т.п. */}
    </div>
  );
};
