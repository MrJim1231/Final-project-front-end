import Status from "../models/Status.js";

// ============================
// 📌 GET ALL STATUSES
// ============================
export const getAll = async () => {
  return await Status.find().sort({ _id: 1 });
};

// ============================
// 📌 CREATE STATUS
// ============================
export const create = async (title) => {
  return await Status.create({ title });
};

// ============================
// 📌 UPDATE STATUS
// ============================
export const update = async (id, title) => {
  return await Status.findByIdAndUpdate(id, { title }, { new: true });
};

// ============================
// 📌 DELETE STATUS
// ============================
export const remove = async (id) => {
  return await Status.findByIdAndDelete(id);
};

export default { getAll, create, update, remove };
