const Status = require("../models/Status");

module.exports = {
  async getAll() {
    return await Status.find();
  },

  async create(title) {
    return await Status.create({ title });
  },

  async update(id, title) {
    return await Status.findByIdAndUpdate(id, { title }, { new: true });
  },

  async remove(id) {
    return await Status.findByIdAndDelete(id);
  },
};
