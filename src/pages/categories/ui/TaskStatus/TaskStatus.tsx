import "./TaskStatus.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const TaskStatus = () => {
  const statuses = ["Completed", "In Progress", "Not Started"];

  return (
    <div className="status-block">
      {/* === Заголовок блока === */}
      <div className="status-block__header">
        <h3 className="status-block__title">Task Status</h3>
        <button className="status-block__add">+ Add Task Status</button>
      </div>

      {/* === Контейнер таблицы === */}
      <div className="status-block__card">
        <table className="status-block__table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((status, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{status}</td>
                <td className="status-block__actions">
                  <button className="status-btn status-btn--edit">
                    <FiEdit2 /> Edit
                  </button>
                  <button className="status-btn status-btn--delete">
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
