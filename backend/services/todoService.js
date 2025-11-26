const Todo = require("../models/Todo");
const Status = require("../models/Status");
const Priority = require("../models/Priority");
const { v4: uuid } = require("uuid");

module.exports = {
  // Получить все задачи пользователя с полными данными статуса и приоритета
  async getAll(userId) {
    return await Todo.find({ userId })
      .sort({ createdAt: -1 })
      .populate("status")
      .populate("priority");
  },

  // Создать новую задачу
  async create(userId, data) {
    // Статус
    const statusDoc =
      (data.status && (await Status.findOne({ title: data.status }))) ||
      (await Status.findOne({ title: "Not Started" }));
    if (!statusDoc) throw { status: 400, message: "Invalid status" };

    // Приоритет
    const priorityDoc =
      (data.priority && (await Priority.findOne({ title: data.priority }))) ||
      (await Priority.findOne({ title: "Low" }));
    if (!priorityDoc) throw { status: 400, message: "Invalid priority" };

    const todo = new Todo({
      id: uuid(),
      userId,
      title: data.title,
      description: data.description || "",
      status: statusDoc._id,
      priority: priorityDoc._id,
      image: data.image || "",
      vital: data.vital || false,
      createdAt: new Date(),
      completedAt: null,
    });

    const saved = await todo.save();
    return await saved.populate("status").populate("priority");
  },

  // Обновить задачу
  async update(id, data) {
    const todo = await Todo.findOne({ id });
    if (!todo) throw { status: 404, message: "Todo not found" };

    // Статус
    if (data.status) {
      const statusDoc = await Status.findOne({ title: data.status });
      if (!statusDoc) throw { status: 400, message: "Invalid status" };
      data.status = statusDoc._id;

      if (statusDoc.title === "Completed" && !todo.completedAt) {
        todo.completedAt = new Date();
      }
    }

    // Приоритет
    if (data.priority) {
      const priorityDoc = await Priority.findOne({ title: data.priority });
      if (!priorityDoc) throw { status: 400, message: "Invalid priority" };
      data.priority = priorityDoc._id;
    }

    Object.assign(todo, data);

    const updated = await todo.save();
    return await updated.populate("status").populate("priority");
  },

  // Удалить задачу
  async remove(id) {
    return await Todo.deleteOne({ id });
  },
};
