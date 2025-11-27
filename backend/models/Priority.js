const mongoose = require("mongoose");

const PrioritySchema = new mongoose.Schema({
  title: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

// Блокировка удаления дефолтных
PrioritySchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc?.isDefault) {
    return next(new Error("Нельзя удалить дефолтный приоритет"));
  }
  next();
});

PrioritySchema.pre(
  "deleteOne",
  { document: true, query: false },
  function (next) {
    if (this.isDefault) {
      return next(new Error("Нельзя удалить дефолтный приоритет"));
    }
    next();
  }
);

module.exports = mongoose.model("Priority", PrioritySchema);
