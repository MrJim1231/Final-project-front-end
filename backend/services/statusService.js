const Status = require("../models/Status");

module.exports = {
  // ============================
  // 📌 GET ALL STATUSES
  // ============================
  async getAll() {
    return await Status.find().sort({ _id: 1 });
  },

  // ============================
  // 📌 CREATE STATUS
  // ============================
  async create(title) {
    return await Status.create({ title });
  },

  // ============================
  // 📌 UPDATE STATUS
  // ============================
  async update(id, title) {
    return await Status.findByIdAndUpdate(id, { title }, { new: true });
  },

  // ============================
  // 📌 DELETE STATUS
  // ============================
  async remove(id) {
    return await Status.findByIdAndDelete(id);
  },
};
