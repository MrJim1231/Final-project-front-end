import "./TaskStatus.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { AddModal } from "../AddModal/AddModal"; // 👈 импорт модалки

export const TaskStatus = () => {
  const [statuses, setStatuses] = useState([
    "Completed",
    "In Progress",
    "Not Started",
  ]);
  const [showModal, setShowModal] = useState(false);

  // === Добавление нового статуса ===
  const handleAddStatus = (value: string) => {
    if (value.trim()) {
      setStatuses((prev) => [...prev, value.trim()]);
    }
    setShowModal(false);
  };

  return (
    <div className="status-block">
      {/* === Заголовок блока === */}
      <div className="status-block__header">
        <h3 className="status-block__title">Task Status</h3>
        <button
          className="status-block__add"
          onClick={() => setShowModal(true)} // 👈 открываем модалку
        >
          <FiPlus className="status-block__add-icon" />
          Add Task Status
        </button>
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

      {/* === Модалка добавления === */}
      {showModal && (
        <AddModal
          title="Add Task Status"
          inputLabel="Task Status Title"
          onClose={() => setShowModal(false)}
          onSubmit={handleAddStatus}
        />
      )}
    </div>
  );
};
