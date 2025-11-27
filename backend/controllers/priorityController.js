const priorityService = require("../services/priorityService");

module.exports = {
  async getAll(req, res) {
    try {
      const items = await priorityService.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch priorities" });
    }
  },

  async create(req, res) {
    try {
      const { title } = req.body;
      const created = await priorityService.create(title);
      res.json(created);
    } catch (error) {
      res.status(500).json({ error: "Failed to create priority" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const updated = await priorityService.update(id, title);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update priority" });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      await priorityService.remove(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove priority" });
    }
  },
};
