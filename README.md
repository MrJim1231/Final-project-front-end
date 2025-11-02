#Документация
https://feature-sliced.github.io/documentation/docs/get-started/overview
npm install react-icons

```bash
src/
├── main.tsx                         # Главная точка входа (ReactDOM.createRoot)
├── index.css                        # Глобальные CSS стили (reset, шрифты)
│
├── app/                             # Всё, что нужно для запуска приложения
│   ├── App.tsx                      # Главный компонент приложения
│   ├── providers/                   # Обертки: Redux, Router, Theme и т.п.
│   ├── routes/                      # Конфигурация маршрутов
│   └── styles/                      # Глобальные стили (themes, reset)
│
├── processes/                       # (устарело, использовать только если нужно)
│   └── checkout/
│       ├── model/
│       └── ui/
│
├── pages/                           # Полные страницы (роуты)
│   └── cart/
│       ├── ui/
│       └── index.ts
│
├── widgets/                         # Крупные виджеты/секции
│   ├── Header/
│   │   ├── model/
│   │   └── ui/
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
├── shared/                          # Переиспользуемые ресурсы
│   ├── ui/
│   ├── lib/
│   ├── config/
│   ├── types/
│   └── assets/

```
