const Todo = require("../models/Todo");
const Status = require("../models/Status");
const Priority = require("../models/Priority");

module.exports = {
  // ============================
  // 📌 GET ALL TODOS
  // ============================
  async getAll(userId) {
    console.log("SERVICE: getAll userId =", userId);

    return await Todo.find({ userId })
      .sort({ createdAt: -1 })
      .populate("status")
      .populate("priority");
  },

  // ============================
  // 📌 CREATE TODO
  // ============================
  async create(userId, data) {
    console.log("\n===== SERVICE: create() =====");
    console.log("Incoming data:", data);

    // --- STATUS ---
    const statusTitle = data.status || "Not Started";
    console.log("Searching Status:", statusTitle);

    const statusDoc = await Status.findOne({ title: statusTitle });
    if (!statusDoc) {
      console.error("❌ Status not found:", statusTitle);
      throw {
        status: 400,
        message: "Invalid status",
        details: { received: statusTitle },
      };
    }
    console.log("✔ Status found:", statusDoc.title, statusDoc._id);

    // --- PRIORITY ---
    const priorityTitle = data.priority || "Low";
    console.log("Searching Priority:", priorityTitle);

    const priorityDoc = await Priority.findOne({ title: priorityTitle });
    if (!priorityDoc) {
      console.error("❌ Priority not found:", priorityTitle);
      throw {
        status: 400,
        message: "Invalid priority",
        details: { received: priorityTitle },
      };
    }
    console.log("✔ Priority found:", priorityDoc.title, priorityDoc._id);

    // --- CREATE TODO OBJECT ---
    const todoData = {
      userId,
      title: data.title,
      description: data.description || "",
      status: statusDoc._id,
      priority: priorityDoc._id,
      image: data.image || "",
      vital: data.vital || false,
      createdAt: new Date(),
      completedAt: null,
    };

    console.log("Saving TODO:", todoData);

    const todo = new Todo(todoData);
    const saved = await todo.save();

    console.log("✔ TODO SAVED:", saved);

    // === FIX: correct populate usage ===
    await saved.populate("status");
    await saved.populate("priority");

    console.log("✔ TODO POPULATED:", saved);

    return saved;
  },

  // ============================
  // 📌 UPDATE TODO
  // ============================
  async update(id, data) {
    console.log("\n===== SERVICE: update() =====");
    console.log("ID =", id);
    console.log("Update Data =", data);

    const todo = await Todo.findById(id);
    if (!todo) {
      console.error("❌ Todo not found:", id);
      throw { status: 404, message: "Todo not found" };
    }

    // --- STATUS UPDATE ---
    if (data.status) {
      console.log("Updating Status:", data.status);

      const statusDoc = await Status.findOne({ title: data.status });
      if (!statusDoc) {
        console.error("❌ Status not found:", data.status);
        throw { status: 400, message: "Invalid status" };
      }

      data.status = statusDoc._id;

      // Если Completed — устанавливаем время
      if (statusDoc.title === "Completed" && !todo.completedAt) {
        todo.completedAt = new Date();
      }
    }

    // --- PRIORITY UPDATE ---
    if (data.priority) {
      console.log("Updating Priority:", data.priority);

      const priorityDoc = await Priority.findOne({ title: data.priority });
      if (!priorityDoc) {
        console.error("❌ Priority not found:", data.priority);
        throw { status: 400, message: "Invalid priority" };
      }

      data.priority = priorityDoc._id;
    }

    Object.assign(todo, data);

    const updated = await todo.save();

    // === FIX populate ===
    await updated.populate("status");
    await updated.populate("priority");

    console.log("✔ TODO UPDATED:", updated);

    return updated;
  },

  // ============================
  // 📌 DELETE TODO
  // ============================
  async remove(id) {
    console.log("SERVICE: remove()", id);
    return await Todo.findByIdAndDelete(id);
  },
};
