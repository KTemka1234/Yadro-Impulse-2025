# YADRO-IMPULSE-2025

Тестовое задание для стажировки Yadro Impulse 2025. Исходное задание [здесь](docs/ASCII-PET.md)

Созданное приложение предоставляет интерфейс для преобразования изображений питомцев в ASCII-графику и их хранения в фаловой системе хоста.

Пример ASCII изображения можно посмотреть [тут](docs/ascii-art.txt)

## Технологии

- **Backend**: Go, Fiber, nfnt/resize.
- **Frontend**: React, Vite, Tailwind CSS, Flowbite UI.
- **Deploy**: Docker, Docker Compose (опционально).
  
## Запуск

Для запуска данного проекта необходимо склонировать репозиторий:

```bash
git clone https://github.com/KTemka1234/Yadro-Impulse-2025.git
```

### Предварительные требования

- Go 1.20+
- Node.js 18+
- Docker (опционально)

### Запуск без Docker

1. **Backend**:

   ```bash
   cd server
   go run main.go
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

- **Backend**: http://localhost:3000 (документация swagger [здесь](docs/ascii-pet.json))
- **Frontend**: http://localhost:5173

## Лицензия

MIT License. Подробнее в файле [LICENSE](LICENSE).
