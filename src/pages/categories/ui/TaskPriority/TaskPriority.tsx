import "./TaskPriority.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { AddModal } from "../AddModal/AddModal";

import {
  getTaskPriority,
  createTaskPriority,
  updateTaskPriority,
  deleteTaskPriority,
} from "@/entities/task/api/priorityApi";

interface PriorityItem {
  id: string;
  title: string;
}

export const TaskPriority = () => {
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<PriorityItem | null>(null);

  const loadPriorities = async () => {
    const { data } = await getTaskPriority();
    setPriorities(data);
  };

  useEffect(() => {
    loadPriorities();
  }, []);

  const handleAdd = async (value: string) => {
    await createTaskPriority({ title: value });
    await loadPriorities();
    setShowModal(false);
  };

  const handleEdit = async (value: string) => {
    if (!editItem) return;
    await updateTaskPriority(editItem.id, { title: value });
    await loadPriorities();
    setEditItem(null);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTaskPriority(id);
    await loadPriorities();
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
              <tr key={priority.id}>
                <td>{i + 1}</td>
                <td>{priority.title}</td>

                <td className="priority-table__actions">
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
                    onClick={() => handleDelete(priority.id)}
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
