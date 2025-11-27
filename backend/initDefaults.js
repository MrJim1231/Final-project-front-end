const mongoose = require("mongoose");
const Status = require("./models/Status");
const Priority = require("./models/Priority");

async function initDefaults() {
  const defaultStatuses = [
    {
      _id: new mongoose.Types.ObjectId("6746afb8f1a86d59f0a11101"),
      title: "Not Started",
    },
    {
      _id: new mongoose.Types.ObjectId("6746afb8f1a86d59f0a11102"),
      title: "In Progress",
    },
    {
      _id: new mongoose.Types.ObjectId("6746afb8f1a86d59f0a11103"),
      title: "Completed",
    },
  ];

  const defaultPriorities = [
    {
      _id: new mongoose.Types.ObjectId("6746afb8f1a86d59f0a11201"),
      title: "Low",
    },
    {
      _id: new mongoose.Types.ObjectId("6746afb8f1a86d59f0a11202"),
      title: "Medium",
    },
    {
      _id: new mongoose.Types.ObjectId("6746afb8f1a86d59f0a11203"),
      title: "High",
    },
  ];

  // Статусы
  for (const item of defaultStatuses) {
    const exists = await Status.findById(item._id);
    if (!exists) {
      await Status.create({ ...item, isDefault: true });
    } else if (!exists.isDefault) {
      exists.isDefault = true;
      await exists.save();
    }
  }

  // Приоритеты
  for (const item of defaultPriorities) {
    const exists = await Priority.findById(item._id);
    if (!exists) {
      await Priority.create({ ...item, isDefault: true });
    } else if (!exists.isDefault) {
      exists.isDefault = true;
      await exists.save();
    }
  }
}

module.exports = initDefaults;
