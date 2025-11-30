import Priority from "../models/Priority.js";

export const getAll = async () => {
  return await Priority.find();
};

export const create = async (title) => {
  return await Priority.create({ title });
};

export const update = async (id, title) => {
  return await Priority.findByIdAndUpdate(id, { title }, { new: true });
};

export const remove = async (id) => {
  return await Priority.findByIdAndDelete(id);
};

export default { getAll, create, update, remove };
