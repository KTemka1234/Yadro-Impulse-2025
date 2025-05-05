# YADRO-IMPULSE-2025

[![Go](https://img.shields.io/badge/Go-1.24-00ADD8?style=flat&logo=go)](https://golang.org/)
[![Fiber](https://img.shields.io/badge/Fiber-2.x-00ADD8?style=flat&logo=go)](https://gofiber.io/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

Тестовое задание для стажировки Yadro Impulse 2025. Исходное задание [здесь](docs/ASCII-PET.md)

Созданное приложение предоставляет интерфейс для преобразования изображений питомцев в ASCII-графику и их хранения в фаловой системе хоста. Созданный дизайн интерфейса в Figma помжно посмотреть [тут](https://www.figma.com/design/aeIdhwNQczHtDMsIlmb9SN/Yadro-TATLIN.Object--Flowbite-design-?node-id=1102-1540&t=d5ZFo79puO7RFiRB-1)

Пример ASCII изображения можно посмотреть [тут](docs/ascii-art.txt)

## Технологии

- **Backend**: Go, Air, Fiber, Zap, go-playground/validator/v10.
- **Frontend**: React, Vite, Tailwind CSS, Flowbite UI, React-Hook-Form, TanStack React Table/Query, Zustand, React-Dropzone.
- **Deploy**: Docker, Docker Compose (опционально).
  
Подробную информацию по разработанным сервисам можно найти в описании: [backend](./server/README.md) и [frontend](./client/README.md)
  
## Запуск

Для запуска данного проекта необходимо склонировать репозиторий:

```bash
git clone https://github.com/KTemka1234/Yadro-Impulse-2025.git
```

Убедитесь, что в корне проекта есть файл *.env*. Если его нет, то создайте. Пример используемых переменных среды можно посмотреть в файле [example.env](example.env)

### Предварительные требования

- Go 1.20+
- Node.js 22+
- Docker (опционально)

### Запуск без Docker

1. **Backend**:

   ```bash
   cd server
   go run main.go

   # Если нужен live-reload, то используйте команду ниже
   air
   ```

2. **Frontend**

    ```bash
    cd client
    npm install
    npm run dev
    ```

### Запуск через Docker

```bash
docker compose up -d --build
```

## Ресурсы

- **Backend**: http://localhost:8000 (документация swagger [здесь](docs/ascii-pet.json))
- **Frontend**: http://localhost:5173

## Лицензия

MIT License. Подробнее в файле [LICENSE](LICENSE).
