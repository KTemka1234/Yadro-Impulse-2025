package middleware

import (
	"strings"

	"github.com/KTemka1234/Yadro-Impulse-2025/server/handlers"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

var validate = validator.New()

func init() {
	validate.RegisterValidation("notempty", func(fl validator.FieldLevel) bool {
		return strings.TrimSpace(fl.Field().String()) != ""
	})
}

func ValidateBody(schema any) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		body := schema

		if err := ctx.BodyParser(body); err != nil {
			return handlers.GetAPIError(ctx, handlers.ErrInvalidRequest)
		}

		if err := validate.Struct(body); err != nil {
			errors := make(map[string]string)
			for _, err := range err.(validator.ValidationErrors) {
				errors[err.Field()] = err.Tag()
			}
			return ctx.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
				"errors": errors,
			})
		}

		ctx.Locals("validatedBody", body)
		return ctx.Next()
	}
}
