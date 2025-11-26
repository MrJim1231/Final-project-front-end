const priorityService = require("../services/priorityService");

module.exports = {
  async getAll(req, res) {
    const items = await priorityService.getAll();
    res.json(items);
  },

  async create(req, res) {
    const { title } = req.body;
    const created = await priorityService.create(title);
    res.json(created);
  },

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const updated = await priorityService.update(id, title);
    res.json(updated);
  },

  async remove(req, res) {
    const { id } = req.params;
    await priorityService.remove(id);
    res.json({ success: true });
  },
};
