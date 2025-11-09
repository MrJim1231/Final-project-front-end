#Документация
https://feature-sliced.github.io/documentation/docs/get-started/overview
npm install react-icons
react-router-dom"
axios

```bash
src/
├── main.tsx                         # 🔹 Точка входа
├── index.css                        # 🔹 Глобальные стили
│
├── app/                             # 🧠 Корневая инфраструктура
│   ├── App.tsx
│   ├── providers/
│   │   ├── RouterProvider.tsx
│   │   └── store/
│   │       ├── store.ts
│   │       └── index.ts
│   ├── routes/
│   │   └── AppRouter.tsx
│   └── styles/                      # reset.css, темы, токены
│
├── pages/                           # 📄 Страницы (роуты)
│   ├── dashboard/
│   │   ├── ui/
│   │   │   ├── Dashboard/
│   │   │   ├── DashboardHeader/
│   │   │   ├── TodoList/
│   │   │   ├── TaskStatus/
│   │   │   └── CompletedTask/
│   │   └── index.ts
│   │
│   ├── my-task/
│   │   ├── ui/
│   │   │   └── MyTask.tsx           # <TaskPage type="my" />
│   │   └── index.ts
│   │
│   ├── vital-task/
│   │   ├── ui/
│   │   │   └── VitalTask.tsx        # <TaskPage type="vital" />
│   │   └── index.ts
│   │
│   ├── completed-task/
│   │   ├── ui/
│   │   │   └── CompletedTask.tsx    # <TaskPage type="completed" />
│   │   └── index.ts
│   │
│   ├── categories/
│   ├── settings/
│   └── help/
│
├── widgets/                         # 🧱 Крупные блоки
│   ├── Header/                      # Верхняя панель
│   ├── Sidebar/                     # Навигация
│   └── TaskPage/                    # Универсальный компонент страниц задач
│       ├── ui/
│       │   └── TaskPage.tsx
│       ├── TaskPage.css
│       └── index.ts
│
├── features/                        # ⚙️ Независимые бизнес-фичи
│   ├── addTask/
│   ├── updateTask/
│   ├── deleteTask/
│   └── ...
│
├── entities/                        # 🧩 Доменные сущности
│   ├── task/
│   │   ├── api/
│   │   │   ├── todos.ts
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   ├── tasksSlice.ts
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── TaskCard/
│   │       ├── TaskDetails/
│   │       └── TaskDetailsModal/
│   │
│   └── user/
│       ├── model/
│       └── ui/
│
└── shared/                          # 🔗 Общие модули
    ├── ui/                          # Базовые компоненты (Button, Input, ...)
    ├── api/
    │   ├── base.ts                  # axios.create()
    │   └── index.ts
    ├── context/
    │   ├── DateContext.tsx
    │   └── index.ts
    ├── lib/
    │   ├── formatDate.ts
    │   └── index.ts
    ├── config/
    │   └── constants.ts
    ├── types/
    │   └── todo.ts
    └── assets/
        ├── images/
        ├── icons/
        └── fonts/

```
