package handlers

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/KTemka1234/Yadro-Impulse-2025/server/config"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

type AsciiPutRequest struct {
	ASCII       string `json:"ascii" validate:"required,min=1,notempty"`
	Description string `json:"description" validate:"required,min=1,notempty"`
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

		desc, _ := strings.CutSuffix(filename, ".txt")

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

		req.Description = strings.TrimSpace(req.Description)

		filename := fmt.Sprintf(
			"%s.txt",
			req.Description,
		)

		files, err := os.ReadDir(config.StoragePath)
		if err != nil {
			return GetAPIError(ctx, ErrFileSaveFailed)
		}

		if len(files) != 0 {
			replacingFile := files[0].Name()
			replacingFilePath := filepath.Join(config.StoragePath, replacingFile)
			os.Remove(replacingFilePath)
		}

		filePath := filepath.Join(config.StoragePath, filename)
		log.Info(filePath)
		// see chmod 0644 for more info
		if err := os.WriteFile(filePath, []byte(req.ASCII), 0644); err != nil {
			return GetAPIError(ctx, ErrFileSaveFailed)
		}

		return ctx.SendStatus(fiber.StatusOK)
	}
}
