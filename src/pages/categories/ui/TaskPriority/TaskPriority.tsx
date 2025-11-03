import "./TaskPriority.css";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export const TaskPriority = () => {
  const priorities = ["Extreme", "Moderate", "Low"];

  return (
    <div className="priority-block">
      {/* === Заголовок блока === */}
      <div className="priority-block__header">
        <h3 className="priority-block__title">Task Priority</h3>
        <button className="priority-block__add">
          <FiPlus className="priority-block__add-icon" />
          Add New Priority
        </button>
      </div>

      {/* === Контейнер таблицы === */}
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
                <td className="priority-table__cell">{i + 1}</td>
                <td className="priority-table__cell">{priority}</td>
                <td className="priority-table__cell priority-table__actions">
                  <button className="priority-btn priority-btn--edit">
                    <FiEdit2 /> Edit
                  </button>
                  <button className="priority-btn priority-btn--delete">
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
