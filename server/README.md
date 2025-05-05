# 🚀 Server (backend)

## 📝 Описание

Бэкенд-сервер на Go (Fiber), предоставляющий API для сохранения и получения ASCII-арта.

## 🔧 Технологии

- **Язык**: [Go 1.24](https://go.dev/)
- **Фреймворк**: [Fiber](https://gofiber.io/)
- **Live-reload**: [Air](https://github.com/air-verse/air)
- **Валидация**: [go-playground/validator](https://github.com/go-playground/validator)
- **Логирование**: [Zap](https://github.com/uber-go/zap)
- **Хранение данных**: файловая система хоста (.txt формат)

## 📁 Структура проекта

```bash
server/
├── config/          # Конфигурация
├── handlers/        # Обработчики API
├── logger/          # Логгер Zap
├── middleware/      # Middleware для валидации API
├── storage/         # Хранилище ASCII-арта
├── main.go          # Точка входа
├── Dockerfile       # Образ для docker-compose
├── .air.toml        # Конфигурация Air live-reload
└── go.mod           # Зависимости
```
