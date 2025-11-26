const todoService = require("../services/todoService");

module.exports = {
  async getAll(req, res) {
    try {
      const items = await todoService.getAll(req.user.id);
      res.json(items);
    } catch (err) {
      console.error("TODO GET ERROR:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  async create(req, res) {
    try {
      const created = await todoService.create(req.user.id, req.body);
      res.json(created);
    } catch (err) {
      console.error("TODO CREATE ERROR:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await todoService.update(id, req.body);
      res.json(updated);
    } catch (err) {
      console.error("TODO UPDATE ERROR:", err);
      res
        .status(err.status || 500)
        .json({ message: err.message || "Server error" });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await todoService.remove(id);
      res.json({ success: true });
    } catch (err) {
      console.error("TODO DELETE ERROR:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};
