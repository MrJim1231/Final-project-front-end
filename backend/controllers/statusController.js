const statusService = require("../services/statusService");

module.exports = {
  async getAll(req, res) {
    const list = await statusService.getAll();
    res.json(list);
  },

  async create(req, res) {
    const { title } = req.body;
    const created = await statusService.create(title);
    res.json(created);
  },

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const updated = await statusService.update(id, title);
    res.json(updated);
  },

  async remove(req, res) {
    const { id } = req.params;
    await statusService.remove(id);
    res.json({ success: true });
  },
};
