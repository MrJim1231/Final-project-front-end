> ⚡ **Важно:** В разработке проекта активно использовался искусственный интеллект (ChatGPT) — для генерации частей кода, оптимизации архитектуры, написания документации и ускорения рутинных процессов.  
> При этом вся структура, логика, постановка задач и итоговая интеграция выполнены вручную.

# 📌 Task Management Dashboard (React + Redux Toolkit)

Task Management Dashboard — это современное приложение для управления задачами, разработанное с использованием **React**, **Redux Toolkit**, **TypeScript** и **Vite**.  
Проект создан как курсовая работа и демонстрирует полноценную архитектуру, продуманную логику и масштабируемую структуру.

---

## 🚀 Основные возможности

### ✔ Управление задачами

- Добавление задач
- Редактирование
- Удаление
- Изменение статуса (Not Started → In Progress → Completed)

### ✔ Фильтрация

- По дате создания
- По типу страницы:
  - My Tasks
  - Vital Tasks
  - Completed Tasks

### ✔ Пагинация

- Отдельная пагинация для каждой категории (my / vital / completed)

### ✔ Поиск

- Поиск по `title` и `description`
- Поиск работает по всем датам и категориям

### ✔ Vital Tasks

- Система выделения важных задач
- Отображение на отдельной странице

### ✔ Completed Tasks

- Автоматический перенос завершённых задач в отдельную категорию

### ✔ Task Details

- Подробная информация о задаче
- Поддержка мобильного интерфейса
- Fallback-логика: если на выбранную дату задач нет — показываются задачи последней доступной даты

### ✔ Redux Toolkit

- slices
- thunks
- selectors
- структура, готовая для подключения backend API

---

## 🛠 Используемые технологии

### Frontend

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router
- React Icons

### API

- axios instance (shared/api/base.ts)
- Готовность к интеграции с backend

---

# 🎨 Соответствие макету (Figma)

Проект разработан на основе дизайн-макета:

**Figma:** https://www.figma.com/design/dpIQhX3dQBVPke5Yg4Qnor/To-do-List-Web-App-Design--Community-?m=auto&is-community-duplicate=1&fuid=942496748580674138

Интерфейс, структура страниц, визуальный стиль и логика работы максимально соответствуют макету.  
Некоторые элементы были улучшены для повышения удобства пользователя и корректной логики приложения.

---

## ✔ Что реализовано по макету

### Страницы и структура

- Dashboard
- My Tasks
- Vital Tasks
- Completed Tasks
- Sidebar
- Header

### Компоненты

- TaskCard
- Task Details
- TaskStatus
- TaskPage

### Модальные окна

- AddTaskModal
- EditTaskModal
- TaskDetailsModal

### Визуальная часть

- Цветовая схема
- Отступы
- Сетка и композиция
- Тени
- Адаптивная верстка

---

## ✔ Улучшения сверх макета

### Completed Tasks

- Полностью реализованная страница
- Рабочая пагинация
- Корректное определение активной карточки

### Пагинация

- Независимая пагинация для:
  - My Tasks
  - Vital Tasks
  - Completed Tasks

### Работа с датами

- Отображение текущей даты
- Пометка **· Today**
- Fallback-дата, если задач на выбранный день нет

### Поиск

- Поиск по `title` и `description`
- Работает по всем датам и категориям

### Fallback-логика списка

Если на выбранную дату задач нет — отображаются задачи предыдущей доступной даты.

### Task Details улучшения

- Исправлена логика выбора задачи
- Корректная работа при пагинации
- Мобильная адаптация

### UX-улучшения

- Предсказуемая навигация
- Удобная работа с задачами
- Адаптация под реальный сценарий использования

---

## ✔ Верстка

- Верстка не является pixel-perfect
- Стиль и структура максимально приближены к макету
- Некоторые элементы адаптированы для лучшего UX

### Архитектура

- Feature-Sliced Design (FSD)

```bash
src/
├── main.tsx                     # Точка входа
├── index.css                    # Глобальные стили
│
├── app/                         # Корневая инфраструктура приложения
│   ├── providers/               # Провайдеры: store, router и т.д.
│   │   └── store/
│   │       ├── store.ts
│   │       └── index.ts
│   └── routes/                  # Маршрутизация
│       └── AppRouter.tsx
│
├── pages/                       # Страницы верхнего уровня (роуты)
│   ├── dashboard/
│   │   └── ui/
│   │       └── Dashboard.tsx
│   │
│   ├── my-task/
│   │   └── ui/
│   │       └── MyTask.tsx
│   │
│   ├── vital-task/
│   │   └── ui/
│   │       └── VitalTask.tsx
│   │
│   ├── completed-task/
│   │   └── ui/
│   │       └── CompletedTask.tsx
│   │
│   └── categories/
│       └── ui/
│           └── CategoriesPage.tsx
│
├── widgets/                     # Крупные блоки интерфейса
│   ├── Header/
│   ├── Sidebar/
│   ├── DashboardHeader/
│   ├── TaskStatus/
│   ├── TodoList/
│   ├── CompletedTask/
│   └── TaskPage/               # Универсальная страница задач
│       ├── ui/
│       │   └── TaskPage.tsx
│       ├── TaskPage.css
│       └── hooks/              # Используешь — значит нужно оставить
│           ├── useFilteredTasks.ts
│           ├── useFallbackTasks.ts
│           ├── usePaginationTasks.ts
│           └── useTaskSelection.ts
│
├── features/                    # Узкие функциональные модули (по необходимости)
│   └── (если появятся — сюда)
│
├── entities/                    # Доменные сущности
│   ├── task/
│   │   ├── api/
│   │   │   └── todos.ts
│   │   ├── model/
│   │   │   ├── tasksSlice.ts
│   │   │   ├── paginationSlice.ts
│   │   │   └── index.ts
│   │   ├── TaskCard/
│   │   │   ├── ui/             # UI карточки
│   │   │   │   └── TaskCard.tsx
│   │   │   ├── TaskCard.css
│   │   │   └── index.ts
│   │   └── ui/                  # Модалки и детали задачи
│   │       ├── AddTaskModal/
│   │       ├── EditTaskModal/
│   │       ├── TaskDetails/
│   │       └── TaskDetailsModal/
│   │
│   └── user/                    # Энтити пользователя
│       ├── model/
│       │   └── userSlice.ts
│       └── ui/
│           └── UserProfile/
│
├── shared/                      # Общие переиспользуемые модули
│   ├── api/
│   │   └── base.ts              # axios instance
│   └── assets/
│       └── images
│
└── data/

```

## 📦 Установка и запуск проекта

```bash
npm install
npm run dev
```
