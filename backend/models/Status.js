const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    isDefault: { type: Boolean, default: false },
  },
  {
    collection: "statuses", // <--- ВАЖНО! Теперь коллекция всегда одна и правильная
  }
);

// === Запрещаем удаление дефолтных статусов ===
StatusSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc?.isDefault) {
    return next(new Error("Нельзя удалить дефолтный статус"));
  }
  next();
});

StatusSchema.pre(
  "deleteOne",
  { document: true, query: false },
  function (next) {
    if (this.isDefault) {
      return next(new Error("Нельзя удалить дефолтный статус"));
    }
    next();
  }
);

module.exports = mongoose.model("Status", StatusSchema);
