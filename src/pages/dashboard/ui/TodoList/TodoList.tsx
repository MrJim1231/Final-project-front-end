import "./TodoList.css";

export const TodoList = () => {
  const tasks = [
    {
      title: "Attend Nischal’s Birthday Party",
      desc: "Buy gifts and pick up cake from the bakery.",
      date: "20/06/2023",
      priority: "High",
      status: "Not Started",
      image: "https://placekitten.com/80/80",
    },
    {
      title: "Landing Page Design for TravelDays",
      desc: "Get design work done by EOD.",
      date: "19/06/2023",
      priority: "Moderate",
      status: "In Progress",
      image: "https://placekitten.com/81/81",
    },
    {
      title: "Presentation on Final Product",
      desc: "Prepare the meeting deck and documents.",
      date: "18/06/2023",
      priority: "Moderate",
      status: "In Progress",
      image: "https://placekitten.com/82/82",
    },
  ];

  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h3 className="todo-list__title">To-Do</h3>
        <button className="todo-list__add">+ Add task</button>
      </div>

      {tasks.map((task, i) => (
        <div key={i} className="todo-card">
          <img src={task.image} alt={task.title} className="todo-card__img" />
          <div className="todo-card__content">
            <h4 className="todo-card__title">{task.title}</h4>
            <p className="todo-card__desc">{task.desc}</p>
            <div className="todo-card__meta">
              <span>Priority: {task.priority}</span>
              <span>Status: {task.status}</span>
            </div>
            <span className="todo-card__date">Created on {task.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
