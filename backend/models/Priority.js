import mongoose from "mongoose";

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

export default mongoose.model("Priority", PrioritySchema);
