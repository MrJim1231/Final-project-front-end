const Todo = require("../models/Todo");
const Status = require("../models/Status");
const Priority = require("../models/Priority");

module.exports = {
  // ============================
  // 📌 GET ALL TODOS (по ownerId)
  // ============================
  async getAll(ownerId) {
    return await Todo.find({ ownerId })
      .sort({ createdAt: -1 })
      .populate("status")
      .populate("priority");
  },

  // ============================
  // 📌 CREATE TODO (для ownerId)
  // ============================
  async create(ownerId, data) {
    const statusTitle = data.status || "Not Started";
    const statusDoc = await Status.findOne({ title: statusTitle });
    if (!statusDoc) {
      throw {
        status: 400,
        message: "Invalid status",
        details: { received: statusTitle },
      };
    }

    const priorityTitle = data.priority || "Low";
    const priorityDoc = await Priority.findOne({ title: priorityTitle });
    if (!priorityDoc) {
      throw {
        status: 400,
        message: "Invalid priority",
        details: { received: priorityTitle },
      };
    }

    const todo = new Todo({
      ownerId, // ← теперь задача привязана к workspace-владельцу
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

    await saved.populate("status");
    await saved.populate("priority");

    return saved;
  },

  // ============================
  // 📌 UPDATE TODO
  // ============================
  async update(id, data) {
    const todo = await Todo.findById(id);
    if (!todo) {
      throw { status: 404, message: "Todo not found" };
    }

    if (data.status) {
      const statusDoc = await Status.findOne({ title: data.status });
      if (!statusDoc) {
        throw { status: 400, message: "Invalid status" };
      }

      data.status = statusDoc._id;

      if (statusDoc.title === "Completed" && !todo.completedAt) {
        todo.completedAt = new Date();
      }
    }

    if (data.priority) {
      const priorityDoc = await Priority.findOne({ title: data.priority });
      if (!priorityDoc) {
        throw { status: 400, message: "Invalid priority" };
      }

      data.priority = priorityDoc._id;
    }

    Object.assign(todo, data);

    const updated = await todo.save();

    await updated.populate("status");
    await updated.populate("priority");

    return updated;
  },

  // ============================
  // 📌 DELETE TODO
  // ============================
  async remove(id) {
    return await Todo.findByIdAndDelete(id);
  },
};
