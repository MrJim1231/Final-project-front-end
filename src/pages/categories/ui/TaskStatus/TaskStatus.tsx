import "./TaskStatus.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const TaskStatus = () => {
  const statuses = ["Completed", "In Progress", "Not Started"];

  return (
    <div className="task-status">
      <div className="task-status__header">
        <h3 className="task-status__title">Task Status</h3>
        <button className="task-status__add">+ Add Task Status</button>
      </div>

      <table className="task-status__table">
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
              <td className="task-status__actions">
                <button className="btn btn--edit">
                  <FiEdit2 /> Edit
                </button>
                <button className="btn btn--delete">
                  <FiTrash2 /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
