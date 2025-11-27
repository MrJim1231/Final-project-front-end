const todoService = require("../services/todoService");

module.exports = {
  // ============================================
  // 📌 GET ALL TODOS
  // ============================================
  async getAll(req, res) {
    try {
      console.log("\n===== GET TODOS =====");
      console.log("USER:", req.user);

      const todos = await todoService.getAll(req.user.id);

      console.log("✔ TODOS RETURNED:", todos.length);
      res.json(todos);
    } catch (err) {
      console.error("❌ TODO GET ERROR:", err);

      res.status(err.status || 500).json({
        message: err.message || "Server error",
        details: err.details || null,
      });
    }
  },

  // ============================================
  // 📌 CREATE TODO
  // ============================================
  async create(req, res) {
    try {
      console.log("\n===== CREATE TODO =====");
      console.log("BODY:", req.body);

      const created = await todoService.create(req.user.id, req.body);

      console.log("✔ TODO CREATED:", created._id);
      res.json(created);
    } catch (err) {
      console.error("❌ TODO CREATE ERROR:", err);

      res.status(err.status || 500).json({
        message: err.message || "Server error",
        details: err.details || null,
      });
    }
  },

  // ============================================
  // 📌 UPDATE TODO
  // ============================================
  async update(req, res) {
    try {
      console.log("\n===== UPDATE TODO =====");
      const { id } = req.params;

      console.log("ID:", id);
      console.log("BODY:", req.body);

      const updated = await todoService.update(id, req.body);

      console.log("✔ TODO UPDATED:", updated._id);
      res.json(updated);
    } catch (err) {
      console.error("❌ TODO UPDATE ERROR:", err);

      res.status(err.status || 500).json({
        message: err.message || "Server error",
        details: err.details || null,
      });
    }
  },

  // ============================================
  // 📌 DELETE TODO
  // ============================================
  async remove(req, res) {
    try {
      console.log("\n===== DELETE TODO =====");
      const { id } = req.params;

      console.log("DELETE ID:", id);

      await todoService.remove(id);

      console.log("✔ TODO DELETED:", id);
      res.json({ success: true });
    } catch (err) {
      console.error("❌ TODO DELETE ERROR:", err);

      res.status(err.status || 500).json({
        message: err.message || "Server error",
        details: err.details || null,
      });
    }
  },
};
