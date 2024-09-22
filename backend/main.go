package main

import (
	"log"

	"laundry-ledger/controller"
	"laundry-ledger/db"
	"laundry-ledger/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	// Initialize database
	db.InitDB()

	// Create Gin router
	r := gin.Default()

	// Enable CORS for all origins
	r.Use(cors.Default())

	// Define routes for signup and login
	r.POST("/signup", controller.Signup)
	r.POST("/login", controller.Login)

	// Protected routes using the AuthMiddleware
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/dashboard", controller.Dashboard) // Protected route
	}

	// Start the server
	log.Fatal(r.Run(":8080"))
}
