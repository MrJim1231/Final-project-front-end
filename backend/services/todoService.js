const Todo = require("../models/Todo");
const { v4: uuid } = require("uuid");

module.exports = {
  async getAll(userId) {
    return await Todo.find({ userId }).sort({ createdAt: -1 });
  },

  async create(userId, data) {
    const todo = new Todo({
      id: uuid(),
      userId,
      title: data.title,
      description: data.description || "",
      priority: data.priority || "Low",
      status: data.status || "Not Started",
      image: data.image || "",
      vital: data.vital || false,
      createdAt: new Date(),
      completedAt: null,
    });

    return await todo.save();
  },

  async update(id, data) {
    const todo = await Todo.findOne({ id });
    if (!todo) throw { status: 404, message: "Todo not found" };

    Object.assign(todo, data);

    // если задача завершена → ставим дату завершения
    if (data.status === "Completed" && !todo.completedAt) {
      todo.completedAt = new Date();
    }

    return await todo.save();
  },

  async remove(id) {
    return await Todo.deleteOne({ id });
  },
};
