import Status from "./models/Status.js";
import Priority from "./models/Priority.js";

async function ensureDefaults(Model, defaultValues) {
  for (const title of defaultValues) {
    const exists = await Model.findOne({ title });

    if (!exists) {
      await Model.create({ title, isDefault: true });
      continue;
    }

    if (!exists.isDefault) {
      exists.isDefault = true;
      await exists.save();
    }
  }
}

export default async function initDefaults() {
  const defaultStatuses = ["Not Started", "In Progress", "Completed"];
  const defaultPriorities = ["Low", "Medium", "High"];

  try {
    await ensureDefaults(Status, defaultStatuses);
    await ensureDefaults(Priority, defaultPriorities);

    console.log("Default Statuses & Priorities ensured ✔️");
  } catch (err) {
    console.error("Error initializing defaults:", err);
  }
}
