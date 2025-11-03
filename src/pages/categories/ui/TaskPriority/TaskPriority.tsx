import "./TaskPriority.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const TaskPriority = () => {
  const priorities = ["Extreme", "Moderate", "Low"];

  return (
    <div className="task-priority">
      <div className="task-priority__header">
        <h3 className="task-priority__title">Task Priority</h3>
        <button className="task-priority__add">+ Add New Priority</button>
      </div>

      <table className="task-priority__table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Task Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {priorities.map((priority, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{priority}</td>
              <td className="task-priority__actions">
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
