const Priority = require("../models/Priority");

module.exports = {
  async getAll() {
    return await Priority.find();
  },

  async create(title) {
    return await Priority.create({ title });
  },

  async update(id, title) {
    return await Priority.findByIdAndUpdate(id, { title }, { new: true });
  },

  async remove(id) {
    return await Priority.findByIdAndDelete(id);
  },
};
