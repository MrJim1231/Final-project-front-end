import statusService from "../services/statusService.js";

export const getAll = async (req, res) => {
  const list = await statusService.getAll();
  res.json(list);
};

export const create = async (req, res) => {
  const { title } = req.body;
  const created = await statusService.create(title);
  res.json(created);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const updated = await statusService.update(id, title);
  res.json(updated);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await statusService.remove(id);
  res.json({ success: true });
};
