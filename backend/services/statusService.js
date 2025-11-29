const Todo = require("../models/Todo");
const Status = require("../models/Status");
const Priority = require("../models/Priority");

module.exports = {
  async getAll(ownerId) {
    return await Todo.find({ ownerId })
      .sort({ createdAt: -1 })
      .populate("status")
      .populate("priority");
  },

  async create(ownerId, data) {
    const statusDoc = await Status.findOne({
      title: data.status || "Not Started",
    });
    const priorityDoc = await Priority.findOne({
      title: data.priority || "Low",
    });

    const todo = new Todo({
      ownerId,
      title: data.title,
      description: data.description || "",
      status: statusDoc._id,
      priority: priorityDoc._id,
      image: data.image || "",
      vital: data.vital || false,
    });

    const saved = await todo.save();
    await saved.populate("status");
    await saved.populate("priority");

    return saved;
  },

  async update(id, data) {
    const todo = await Todo.findById(id);
    if (!todo) throw { status: 404, message: "Todo not found" };

    if (data.status) {
      const statusDoc = await Status.findOne({ title: data.status });
      data.status = statusDoc._id;

      if (statusDoc.title === "Completed" && !todo.completedAt) {
        todo.completedAt = new Date();
      }
    }

    if (data.priority) {
      const priorityDoc = await Priority.findOne({ title: data.priority });
      data.priority = priorityDoc._id;
    }

    Object.assign(todo, data);
    const updated = await todo.save();

    await updated.populate("status");
    await updated.populate("priority");

    return updated;
  },

  async remove(id) {
    return await Todo.findByIdAndDelete(id);
  },
};
