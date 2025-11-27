const todoService = require("../services/todoService");

module.exports = {
  // ============================================
  // 📌 GET ALL TODOS
  // ============================================
  async getAll(req, res) {
    try {
      const todos = await todoService.getAll(req.user.id);
      res.json(todos);
    } catch (err) {
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
      const created = await todoService.create(req.user.id, req.body);
      res.json(created);
    } catch (err) {
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
      const { id } = req.params;
      const updated = await todoService.update(id, req.body);
      res.json(updated);
    } catch (err) {
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
      const { id } = req.params;
      await todoService.remove(id);
      res.json({ success: true });
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message || "Server error",
        details: err.details || null,
      });
    }
  },
};
