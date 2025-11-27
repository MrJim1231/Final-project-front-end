const Status = require("./models/Status");
const Priority = require("./models/Priority");

async function initDefaults() {
  const defaultStatuses = ["Not Started", "In Progress", "Completed"];
  const defaultPriorities = ["Low", "Medium", "High"];

  // Статусы
  for (const title of defaultStatuses) {
    const exists = await Status.findOne({ title });
    if (!exists) {
      await Status.create({ title });
    }
  }

  // Приоритеты
  for (const title of defaultPriorities) {
    const exists = await Priority.findOne({ title });
    if (!exists) {
      await Priority.create({ title });
    }
  }
}

module.exports = initDefaults;
