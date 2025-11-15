import "./TaskStatus.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { AddModal } from "../AddModal/AddModal";

import {
  getTaskStatus,
  createTaskStatus,
  updateTaskStatus,
  deleteTaskStatus,
} from "@/shared/api/statusApi";

interface StatusItem {
  id: string;
  title: string;
}

export const TaskStatus = () => {
  const [statuses, setStatuses] = useState<StatusItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<StatusItem | null>(null);

  // === Получаем статусы ===
  const loadStatuses = async () => {
    const data = await getTaskStatus();
    setStatuses(data);
  };

  useEffect(() => {
    loadStatuses();
  }, []);

  // === Добавление ===
  const handleAddStatus = async (value: string) => {
    await createTaskStatus({ title: value });
    await loadStatuses();
    setShowModal(false);
  };

  // === Редактирование ===
  const handleEditStatus = async (value: string) => {
    if (!editItem) return;

    await updateTaskStatus(editItem.id, { title: value });
    await loadStatuses();
    setEditItem(null);
    setShowModal(false);
  };

  // === Удаление ===
  const handleDelete = async (id: string) => {
    await deleteTaskStatus(id);
    await loadStatuses();
  };

  return (
    <div className="status-block">
      <div className="status-block__header">
        <h3 className="status-block__title">Task Status</h3>

        <button
          className="status-block__add"
          onClick={() => {
            setEditItem(null);
            setShowModal(true);
          }}
        >
          <FiPlus /> Add Task Status
        </button>
      </div>

      <div className="status-table">
        <table className="status-table__inner">
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {statuses.map((status, i) => (
              <tr key={status.id} className="status-table__row">
                <td className="status-table__cell" data-label="SN">
                  {i + 1}
                </td>

                <td className="status-table__cell" data-label="Task Status">
                  {status.title}
                </td>

                <td
                  className="status-table__cell status-table__actions"
                  data-label="Action"
                >
                  <button
                    className="status-btn status-btn--edit"
                    onClick={() => {
                      setEditItem(status);
                      setShowModal(true);
                    }}
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    className="status-btn status-btn--delete"
                    onClick={() => handleDelete(status.id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddModal
          title={editItem ? "Edit Task Status" : "Add Task Status"}
          inputLabel="Task Status Title"
          confirmText={editItem ? "Update" : "Create"}
          cancelText="Cancel"
          initialValue={editItem?.title || ""}
          onClose={() => {
            setShowModal(false);
            setEditItem(null);
          }}
          onSubmit={editItem ? handleEditStatus : handleAddStatus}
        />
      )}
    </div>
  );
};
