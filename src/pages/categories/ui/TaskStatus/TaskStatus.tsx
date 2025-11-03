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
      <div className="status-table">
        <table className="status-table__inner">
          <thead className="status-table__head">
            <tr>
              <th className="status-table__col status-table__col--sn">SN</th>
              <th className="status-table__col status-table__col--name">
                Task Status
              </th>
              <th className="status-table__col status-table__col--action">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="status-table__body">
            {statuses.map((status, i) => (
              <tr key={i} className="status-table__row">
                <td className="status-table__cell">{i + 1}</td>
                <td className="status-table__cell">{status}</td>
                <td className="status-table__cell status-table__actions">
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
