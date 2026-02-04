package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// High performance server setup using Fiber (Prefork enabled possible)
	app := fiber.New(fiber.Config{
		AppName: "Textile3D Atlas Service",
		// Prefork: true, // Uncomment for high concurrency in production
	})

	app.Use(logger.New())

	// Health Check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{
			"status":  "ok",
			"service": "atlas-service",
		})
	})

	// WebSocket Endpoint (Placeholder)
	app.Get("/ws", func(c *fiber.Ctx) error {
		return c.SendString("WebSocket Endpoint Placeholder")
	})

	log.Println("Atlas Service (High Performance) running on :3001")
	log.Fatal(app.Listen(":3001"))
}
