package handlers

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/KTemka1234/Yadro-Impulse-2025/server/config"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

type AsciiPutRequest struct {
	ASCII       string `json:"ascii"`
	Description string `json:"description"`
}

func GetPetImageV1(log *zap.Logger) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		files, err := os.ReadDir(config.StoragePath)
		if err != nil {
			return GetAPIError(ctx, ErrFileReadFailed)
		}

		if len(files) == 0 {
			return GetAPIError(ctx, ErrFileNotFound)
		}

		filename := files[0].Name()
		filePath := filepath.Join(config.StoragePath, filename)

		data, err := os.ReadFile(filePath)
		if err != nil {
			return GetAPIError(ctx, ErrFileReadFailed)
		}

		desc := strings.Split(filename, "_")[0]

		ctx.Set("Content-Type", "application/json")
		return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
			"ascii":       string(data),
			"description": desc,
		})
	}
}

func PutPetImageV1(log *zap.Logger) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		var req AsciiPutRequest
		if err := ctx.BodyParser(&req); err != nil {
			return GetAPIError(ctx, ErrInvalidRequest)
		}

		filename := fmt.Sprintf(
			"%s_%d.txt",
			req.Description,
			time.Now().Unix(),
		)

		filePath := filepath.Join(config.StoragePath, filename)
		err := os.WriteFile(filePath, []byte(req.ASCII), 0644)
		if err != nil {
			return GetAPIError(ctx, ErrFileSaveFailed)
		}

		ctx.Set("Content-Type", "application/json")
		return ctx.SendStatus(fiber.StatusOK)
	}
}
