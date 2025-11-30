import priorityService from "../services/priorityService.js";

export const getAll = async (req, res) => {
  try {
    const items = await priorityService.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch priorities" });
  }
};

export const create = async (req, res) => {
  try {
    const { title } = req.body;
    const created = await priorityService.create(title);
    res.json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create priority" });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updated = await priorityService.update(id, title);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update priority" });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await priorityService.remove(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove priority" });
  }
};
