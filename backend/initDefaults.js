import Status from "../models/Status.js";
import Priority from "../models/Priority.js";

async function initDefaults() {
  const defaultStatuses = ["Not Started", "In Progress", "Completed"];
  const defaultPriorities = ["Low", "Medium", "High"];

  // === СТАТУСЫ ===
  for (const title of defaultStatuses) {
    const exists = await Status.findOne({ title });

    if (!exists) {
      await Status.create({ title, isDefault: true });
    } else if (!exists.isDefault) {
      exists.isDefault = true;
      await exists.save();
    }
  }

  // === ПРИОРИТЕТЫ ===
  for (const title of defaultPriorities) {
    const exists = await Priority.findOne({ title });

    if (!exists) {
      await Priority.create({ title, isDefault: true });
    } else if (!exists.isDefault) {
      exists.isDefault = true;
      await exists.save();
    }
  }
}

export default initDefaults;
