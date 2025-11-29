const todoService = require("../services/todoService");

module.exports = {
  // ============================================
  // 📌 GET ALL TODOS — только для владельца проекта
  // ============================================
  async getAll(req, res) {
    try {
      const ownerId = req.user.ownerId; // <-- ВАЖНО!

      const todos = await todoService.getAll(ownerId);

      res.json(todos);
    } catch (err) {
      res.status(err.status || 500).json({
        message: err.message || "Server error",
        details: err.details || null,
      });
    }
  },

  // ============================================
  // 📌 CREATE TODO — участник role=view НЕ МОЖЕТ
  // ============================================
  async create(req, res) {
    try {
      if (req.user.role === "view") {
        return res.status(403).json({
          message: "You don't have permission to create tasks",
        });
      }

      const ownerId = req.user.ownerId; // <-- все таски принадлежат владельцу

      const created = await todoService.create(ownerId, req.body);

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
      if (req.user.role === "view") {
        return res.status(403).json({
          message: "You don't have permission to edit tasks",
        });
      }

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
      if (req.user.role === "view") {
        return res.status(403).json({
          message: "You don't have permission to delete tasks",
        });
      }

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
