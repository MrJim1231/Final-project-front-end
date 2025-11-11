#Документация
https://feature-sliced.github.io/documentation/docs/get-started/overview
npm install react-icons
react-router-dom"
axios

```bash
src/
├── main.tsx                         # 🔹 Точка входа приложения
├── index.css                        # 🔹 Глобальные стили и normalize/reset
│
├── app/                             # 🧠 Корневая инфраструктура
│   ├── App.tsx
│   ├── providers/                   # Провайдеры (контексты, store)
│   │   ├── RouterProvider.tsx       # Настройка роутинга
│   │   └── store/
│   │       ├── store.ts             # configureStore + middleware
│   │       └── index.ts
│   ├── routes/
│   │   └── AppRouter.tsx            # Все маршруты приложения
│   └── styles/
│       ├── reset.css
│       ├── globals.css
│       └── variables.css            # Токены, темы, шрифты
│
├── pages/                           # 📄 Страницы (роуты верхнего уровня)
│   ├── dashboard/
│   │   ├── ui/
│   │   │   └── Dashboard/
│   │   │       ├── Dashboard.tsx
│   │   │       └── Dashboard.css
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
│   │   └── ui/
│   │       └── CategoriesPage.tsx
│   │
│   ├── settings/
│   │   └── ui/
│   │       └── SettingsPage.tsx
│   │
│   └── help/
│       └── ui/
│           └── HelpPage.tsx
│
├── widgets/                         # 🧱 Крупные части интерфейса
│   ├── Header/                      # Верхняя панель (поиск, дата, аватар)
│   ├── Sidebar/                     # Навигация (иконки, меню)
│   ├── DashboardHeader/             # Заголовок дашборда
│   ├── TodoList/                    # Список задач (использует TaskCard)
│   ├── TaskStatus/                  # Статистика по статусам
│   ├── CompletedTask/               # Виджет завершённых задач
│   └── TaskPage/                    # Универсальный контейнер для задач
│       ├── ui/
│       │   └── TaskPage.tsx
│       ├── TaskPage.css
│       └── index.ts
│
├── features/                        # ⚙️ Независимые бизнес-фичи (точечные сценарии)
│   ├── addTask/
│   ├── updateTask/
│   ├── deleteTask/
│   ├── changeStatus/
│   ├── markVital/
│   └── ...
│
├── entities/                        # 🧩 Доменные сущности
│   ├── task/
│   │   ├── api/
│   │   │   ├── todos.ts             # CRUD-запросы к MockAPI / JSON-server
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   ├── tasksSlice.ts        # Redux slice задач
│   │   │   ├── paginationSlice.ts   # Slice для пагинации
│   │   │   └── index.ts
│   │   ├── TaskCard/                # 💡 Отдельная сущность TaskCard
│   │   │   ├── ui/
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   ├── TaskCardMenu.tsx
│   │   │   │   └── TaskCardDetails.tsx
│   │   │   ├── lib/
│   │   │   │   ├── formatTimeAgo.ts
│   │   │   │   ├── getSafeImageSrc.ts
│   │   │   │   └── getStatusColor.ts
│   │   │   ├── model/
│   │   │   │   └── useTaskActions.ts
│   │   │   ├── TaskCard.css
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── AddTaskModal/
│   │       ├── EditTaskModal/
│   │       ├── TaskDetails/
│   │       └── TaskDetailsModal/
│   │
│   └── user/
│       ├── model/
│       │   └── userSlice.ts
│       └── ui/
│           └── UserProfile/
│
└── shared/                          # 🔗 Общие переиспользуемые модули
    ├── ui/                          # Базовые UI-компоненты (Button, Input, Modal, ... )
    ├── api/
    │   ├── base.ts                  # axios.create()
    │   └── index.ts
    ├── context/
    │   ├── DateContext.tsx
    │   └── index.ts
    ├── lib/
    │   ├── formatDate.ts
    │   ├── debounce.ts
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
