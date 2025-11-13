import "./TaskPriority.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import React, { useState } from "react";
import { AddModal } from "../AddModal/AddModal";

export const TaskPriority = () => {
  const [priorities, setPriorities] = useState(["Extreme", "Moderate", "Low"]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // === Добавление нового приоритета ===
  const handleAddPriority = (value: string) => {
    if (value.trim()) {
      setPriorities((prev) => [...prev, value.trim()]);
    }
    setShowModal(false);
  };

  // === Редактирование ===
  const handleEditPriority = (value: string) => {
    if (editIndex !== null && value.trim()) {
      setPriorities((prev) =>
        prev.map((item, i) => (i === editIndex ? value.trim() : item))
      );
    }
    setEditIndex(null);
    setShowModal(false);
  };

  // === Удаление ===
  const handleDelete = (index: number) => {
    setPriorities((prev) => prev.filter((_, i) => i !== index));
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="priority-block">
      {/* === Header === */}
      <div className="priority-block__header">
        <h3 className="priority-block__title">Task Priority</h3>
        <button
          className="priority-block__add"
          onClick={() => {
            setEditIndex(null);
            setShowModal(true);
          }}
        >
          <FiPlus className="priority-block__add-icon" />
          Add New Priority
        </button>
      </div>

      {/* === Table === */}
      <div className="priority-table">
        <table className="priority-table__inner">
          <thead className="priority-table__head">
            <tr>
              <th className="priority-table__col priority-table__col--sn">
                SN
              </th>
              <th className="priority-table__col priority-table__col--name">
                Task Priority
              </th>
              <th className="priority-table__col priority-table__col--action">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="priority-table__body">
            {priorities.map((priority, i) => (
              <tr key={i} className="priority-table__row">
                <td className="priority-table__cell" data-label="SN">
                  {i + 1}
                </td>

                <td className="priority-table__cell" data-label="Task Priority">
                  {priority}
                </td>

                <td
                  className="priority-table__cell priority-table__actions"
                  data-label="Action"
                >
                  <button
                    className="priority-btn priority-btn--edit"
                    onClick={() => openEditModal(i)}
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    className="priority-btn priority-btn--delete"
                    onClick={() => handleDelete(i)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Modal === */}
      {showModal && (
        <AddModal
          title={
            editIndex !== null ? "Edit Task Priority" : "Add Task Priority"
          }
          inputLabel="Task Priority Title"
          confirmText={editIndex !== null ? "Update" : "Create"}
          cancelText="Cancel"
          onClose={() => {
            setShowModal(false);
            setEditIndex(null);
          }}
          onSubmit={editIndex !== null ? handleEditPriority : handleAddPriority}
        />
      )}
    </div>
  );
};
