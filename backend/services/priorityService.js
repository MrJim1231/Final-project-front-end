const Priority = require("../models/Priority");
const { v4: uuid } = require("uuid");

module.exports = {
  async getAll() {
    return await Priority.find();
  },

  async create(title) {
    return await Priority.create({
      id: uuid(),
      title,
    });
  },

  async update(id, title) {
    return await Priority.findOneAndUpdate({ id }, { title }, { new: true });
  },

  async remove(id) {
    return await Priority.findOneAndDelete({ id });
  },
};
