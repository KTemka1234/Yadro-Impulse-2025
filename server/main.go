package main

import (
	"os"

	"github.com/KTemka1234/Yadro-Impulse-2025/server/config"
	"github.com/KTemka1234/Yadro-Impulse-2025/server/handlers"
	"github.com/KTemka1234/Yadro-Impulse-2025/server/logger"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.uber.org/zap"
)

func main() {
	log := logger.New(true)
	defer log.Sync()

	os.MkdirAll(config.StoragePath, 0755) // see chmod 0755 for more info

	app := fiber.New()

	app.Use(logger.RequestLogging(log))

	FRONTEND_URL := os.Getenv("FRONTEND_URL")
	if FRONTEND_URL == "" {
		FRONTEND_URL = "http://localhost:5173"
	}
	
	app.Use(cors.New(cors.Config{
		AllowOrigins: FRONTEND_URL,
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/v1/pet", handlers.GetPetImageV1(log))
	app.Put("/v1/pet", handlers.PutPetImageV1(log))
	
	PORT := os.Getenv("BACKEND_PORT")
	if PORT == "" {
		PORT = "8000"
	}

	log.Fatal("Server stopped", zap.Error(app.Listen(":" + PORT)))
}
