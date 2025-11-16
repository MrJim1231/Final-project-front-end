interface TaskCardMenuProps {
  actions: string[];
  onAction: (action: string) => void;
  disabled?: boolean;
}

export const TaskCardMenu = ({
  actions,
  onAction,
  disabled,
}: TaskCardMenuProps) => (
  <div className="task-card__actions">
    <ul>
      {actions.map((action) => (
        <li
          key={action}
          className={`task-card__action-item ${disabled ? "disabled" : ""}`}
          onClick={() => !disabled && onAction(action)}
        >
          {action}
        </li>
      ))}
    </ul>
  </div>
);
