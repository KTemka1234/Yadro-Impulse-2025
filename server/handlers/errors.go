package handlers

import "github.com/gofiber/fiber/v2"

type PetAPIError struct {
	Status int    `json:"status"`
	Msg    string `json:"message"`
}

var (
	ErrInvalidRequest = PetAPIError{
		Status: 400,
		Msg:    "Invalid request data",
	}

	ErrDescriptionEmpty = PetAPIError{
		Status: 400,
		Msg:    "Description cannot be empty",
	}

	ErrAsciiEmpty = PetAPIError{
		Status: 400,
		Msg:    "Ascii art cannot be empty",
	}

	ErrFileSaveFailed = PetAPIError{
		Status: 500,
		Msg:    "Failed to save file",
	}

	ErrFileReadFailed = PetAPIError{
		Status: 500,
		Msg:    "Failed to read file",
	}

	ErrFileNotFound = PetAPIError{
		Status: 404,
		Msg:    "File not found",
	}

	ErrInternalServer = PetAPIError{
		Status: 500,
		Msg:    "Internal server error",
	}
)

func GetAPIError(ctx *fiber.Ctx, err PetAPIError) error {
	ctx.Set("Content-Type", "application/json")
	return ctx.Status(err.Status).JSON(fiber.Map{
		"error": err.Msg,
	})
}
