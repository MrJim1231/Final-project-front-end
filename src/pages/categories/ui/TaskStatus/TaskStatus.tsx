import "./TaskStatus.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { AddModal } from "../AddModal/AddModal";

export const TaskStatus = () => {
  const [statuses, setStatuses] = useState([
    "Completed",
    "In Progress",
    "Not Started",
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // === Добавление нового статуса ===
  const handleAddStatus = (value: string) => {
    if (value.trim()) {
      setStatuses((prev) => [...prev, value.trim()]);
    }
    setShowModal(false);
  };

  // === Редактирование статуса ===
  const handleEditStatus = (value: string) => {
    if (editIndex !== null && value.trim()) {
      setStatuses((prev) =>
        prev.map((item, i) => (i === editIndex ? value.trim() : item))
      );
    }
    setEditIndex(null);
    setShowModal(false);
  };

  // === Удаление статуса ===
  const handleDeleteStatus = (index: number) => {
    setStatuses((prev) => prev.filter((_, i) => i !== index));
  };

  // === Открытие модалки ===
  const openEditModal = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="status-block">
      {/* === Заголовок === */}
      <div className="status-block__header">
        <h3 className="status-block__title">Task Status</h3>
        <button
          className="status-block__add"
          onClick={() => {
            setEditIndex(null);
            setShowModal(true);
          }}
        >
          <FiPlus className="status-block__add-icon" />
          Add Task Status
        </button>
      </div>

      {/* === Таблица === */}
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
                <td className="status-table__cell" data-label="SN">
                  {i + 1}
                </td>

                <td className="status-table__cell" data-label="Task Status">
                  {status}
                </td>

                <td
                  className="status-table__cell status-table__actions"
                  data-label="Action"
                >
                  <button
                    className="status-btn status-btn--edit"
                    onClick={() => openEditModal(i)}
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    className="status-btn status-btn--delete"
                    onClick={() => handleDeleteStatus(i)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Модалка === */}
      {showModal && (
        <AddModal
          title={editIndex !== null ? "Edit Task Status" : "Add Task Status"}
          inputLabel="Task Status Title"
          confirmText={editIndex !== null ? "Update" : "Create"}
          cancelText="Cancel"
          onClose={() => {
            setShowModal(false);
            setEditIndex(null);
          }}
          onSubmit={editIndex !== null ? handleEditStatus : handleAddStatus}
        />
      )}
    </div>
  );
};
