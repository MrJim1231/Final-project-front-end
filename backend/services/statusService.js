const Status = require("../models/Status");
const { v4: uuid } = require("uuid");

module.exports = {
  async getAll() {
    return await Status.find();
  },

  async create(title) {
    return await Status.create({
      id: uuid(),
      title,
    });
  },

  async update(id, title) {
    return await Status.findOneAndUpdate({ id }, { title }, { new: true });
  },

  async remove(id) {
    return await Status.findOneAndDelete({ id });
  },
};
