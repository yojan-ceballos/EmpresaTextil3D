package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	// 1. Initialize Fiber
	app := fiber.New(fiber.Config{
		AppName:       "Textile3D Flow Service",
		Prefork:       false, // Enable in production
		CaseSensitive: true,
	})

	// 2. Middleware
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	// 3. Routes (Placeholder)
	api := app.Group("/api")
	v1 := api.Group("/v1")

	v1.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"status":  "ok",
			"service": "flow-service",
		})
	})

	// 4. Start Server
	log.Fatal(app.Listen(":3000"))
}
