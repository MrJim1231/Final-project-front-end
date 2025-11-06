#Документация
https://feature-sliced.github.io/documentation/docs/get-started/overview
npm install react-icons
react-router-dom"
axios

```bash
src/
├── main.tsx                         # Главная точка входа (ReactDOM.createRoot)
├── index.css                        # Глобальные CSS стили (reset, шрифты)
│
├── app/                             # Всё, что нужно для запуска приложения
│   ├── App.tsx                      # Главный компонент приложения
│   ├── providers/                   # Обертки: Router, Redux, Theme и т.п.
│   ├── routes/                      # Конфигурация маршрутов приложения
│   │   └── AppRouter.tsx            # Все <Routes> и <Route>
│   └── styles/                      # Глобальные стили (themes, reset)
│
├── pages/                           # Полные страницы (роуты)
│   ├── dashboard/                   # Страница Dashboard
│   │   ├── ui/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Dashboard.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── DashboardHeader/
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   ├── DashboardHeader.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── TodoList/
│   │   │   │   ├── TodoList.tsx
│   │   │   │   ├── TodoList.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── TaskStatus/
│   │   │   │   ├── TaskStatus.tsx
│   │   │   │   ├── TaskStatus.css
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── CompletedTask/
│   │   │       ├── CompletedTask.tsx
│   │   │       ├── CompletedTask.css
│   │   │       └── index.ts
│   │   │
│   │   └── index.ts                 # Экспорт страницы Dashboard
│   │
│   ├── vital-task/
│   │   ├── ui/
│   │   │   ├── VitalTask.tsx
│   │   │   └── VitalTask.css
│   │   └── index.ts
│   │
│   ├── my-task/
│   │   ├── ui/
│   │   │   ├── MyTask.tsx
│   │   │   └── MyTask.css
│   │   └── index.ts
│   │
│   ├── categories/
│   │   ├── ui/
│   │   │   ├── TaskCategories.tsx
│   │   │   └── TaskCategories.css
│   │   └── index.ts
│   │
│   ├── settings/
│   │   ├── ui/
│   │   │   ├── Settings.tsx
│   │   │   └── Settings.css
│   │   └── index.ts
│   │
│   └── help/
│       ├── ui/
│       │   ├── Help.tsx
│       │   └── Help.css
│       └── index.ts
│
├── widgets/                         # Крупные секции интерфейса (Header, Sidebar и т.п.)
│   ├── Header/
│   │   ├── model/
│   │   └── ui/
│   │       ├── Header.tsx
│   │       ├── Header.css
│   │       └── index.ts
│   │
│   ├── Sidebar/
│   │   ├── ui/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Sidebar.css
│   │   │   └── index.ts
│   │   └── model/
│   │
│   └── CartSidebar/
│       ├── model/
│       └── ui/
│
├── features/                        # Повторно используемые бизнес-фичи
│   └── addToCart/
│       ├── model/
│       ├── ui/
│       └── lib/
│
├── entities/                        # Бизнес-сущности (user, product и т.п.)
│   ├── product/
│   │   ├── model/
│   │   └── ui/
│   └── user/
│       ├── model/
│       └── ui/
│
└── shared/                          # Общие ресурсы
    ├── ui/                          # Кнопки, инпуты, карточки и т.п.
    ├── lib/                         # Утилиты, хелперы
    ├── config/                      # Конфиги и константы
    ├── types/                       # Общие типы TypeScript
    └── assets/                      # Изображения, иконки, шрифты и т.п.
```
