const Status = require("./models/Status");
const Priority = require("./models/Priority");

async function initDefaults() {
  // Проверяем и создаем дефолтные статусы
  const defaultStatuses = ["Not Started", "In Progress", "Completed"];
  for (const title of defaultStatuses) {
    const exists = await Status.findOne({ title });
    if (!exists) {
      await Status.create({ title });
      console.log(`Created default status: ${title}`);
    }
  }

  // Проверяем и создаем дефолтные приоритеты
  const defaultPriorities = ["Low", "Medium", "High"];
  for (const title of defaultPriorities) {
    const exists = await Priority.findOne({ title });
    if (!exists) {
      await Priority.create({ title });
      console.log(`Created default priority: ${title}`);
    }
  }

  console.log("Default statuses and priorities initialized.");
}

module.exports = initDefaults;
