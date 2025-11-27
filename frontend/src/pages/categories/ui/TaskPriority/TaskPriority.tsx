import "./TaskPriority.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { AddModal } from "../AddModal/AddModal";

import {
  getTaskPriority,
  createTaskPriority,
  updateTaskPriority,
  deleteTaskPriority,
} from "@/shared/api/priorityApi";

interface PriorityItem {
  _id: string; // <— изменено
  title: string;
}

export const TaskPriority = () => {
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<PriorityItem | null>(null);

  // === Загрузка ===
  const loadPriorities = async () => {
    try {
      const list = await getTaskPriority();
      setPriorities(list);
    } catch (err) {
      console.error("Failed to load priorities:", err);
    }
  };

  useEffect(() => {
    loadPriorities();
  }, []);

  // === Добавление ===
  const handleAdd = async (value: string) => {
    try {
      await createTaskPriority({ title: value });
      await loadPriorities();
      setShowModal(false);
    } catch (err) {
      console.error("Error creating priority:", err);
    }
  };

  // === Редактирование ===
  const handleEdit = async (value: string) => {
    if (!editItem) return;

    try {
      await updateTaskPriority(editItem._id, { title: value }); // <— заменено
      await loadPriorities();
      setEditItem(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating priority:", err);
    }
  };

  // === Удаление ===
  const handleDelete = async (_id: string) => {
    try {
      await deleteTaskPriority(_id); // <— заменено
      await loadPriorities();
    } catch (err) {
      console.error("Error deleting priority:", err);
    }
  };

  return (
    <div className="priority-block">
      <div className="priority-block__header">
        <h3 className="priority-block__title">Task Priority</h3>

        <button
          className="priority-block__add"
          onClick={() => {
            setEditItem(null);
            setShowModal(true);
          }}
        >
          <FiPlus /> Add New Priority
        </button>
      </div>

      <div className="priority-table">
        <table className="priority-table__inner">
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {priorities.map((priority, i) => (
              <tr key={priority._id} className="priority-table__row">
                <td className="priority-table__cell" data-label="SN">
                  {i + 1}
                </td>

                <td className="priority-table__cell" data-label="Task Priority">
                  {priority.title}
                </td>

                <td
                  className="priority-table__cell priority-table__actions"
                  data-label="Action"
                >
                  <button
                    className="priority-btn priority-btn--edit"
                    onClick={() => {
                      setEditItem(priority);
                      setShowModal(true);
                    }}
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    className="priority-btn priority-btn--delete"
                    onClick={() => handleDelete(priority._id)}
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
          title={editItem ? "Edit Task Priority" : "Add Task Priority"}
          inputLabel="Priority Title"
          confirmText={editItem ? "Update" : "Create"}
          cancelText="Cancel"
          initialValue={editItem?.title || ""}
          onClose={() => {
            setShowModal(false);
            setEditItem(null);
          }}
          onSubmit={editItem ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
};
