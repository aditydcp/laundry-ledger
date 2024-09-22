package main

import (
	"log"
	"time"

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
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Define routes for signup and login
	r.POST("/signup", func(c *gin.Context) { controller.Signup(c, db.DB) })
	r.POST("/login", func(c *gin.Context) { controller.Login(c, db.DB) })

	// Protected routes using the AuthMiddleware
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// protected.GET("/dashboard", controller.Dashboard) // Protected route

		protected.GET("/clothings", func(c *gin.Context) { controller.GetAllClothings(c, db.DB) })
		protected.GET("/clothings/:id", func(c *gin.Context) { controller.GetClothingByID(c, db.DB) })
		protected.POST("/clothings", func(c *gin.Context) { controller.CreateClothing(c, db.DB) })
		protected.PUT("/clothings/:id", func(c *gin.Context) { controller.UpdateClothing(c, db.DB) })
		protected.DELETE("/clothings/:id", func(c *gin.Context) { controller.DeleteClothing(c, db.DB) })

		protected.GET("/orders", func(c *gin.Context) { controller.GetAllOrders(c, db.DB) })
		protected.GET("/orders/:id", func(c *gin.Context) { controller.GetOrderByID(c, db.DB) })
		protected.POST("/orders", func(c *gin.Context) { controller.CreateOrder(c, db.DB) })
		protected.PUT("/orders/:id", func(c *gin.Context) { controller.UpdateOrder(c, db.DB) })
		protected.DELETE("/orders/:id", func(c *gin.Context) { controller.DeleteOrder(c, db.DB) })

		protected.GET("/orderdetails", func(c *gin.Context) { controller.GetAllOrderDetails(c, db.DB) })
		protected.GET("/orderdetails/:id", func(c *gin.Context) { controller.GetOrderDetailByID(c, db.DB) })
		protected.POST("/orderdetails", func(c *gin.Context) { controller.CreateOrderDetail(c, db.DB) })
		protected.PUT("/orderdetails/:id", func(c *gin.Context) { controller.UpdateOrderDetail(c, db.DB) })
		protected.DELETE("/orderdetails/:id", func(c *gin.Context) { controller.DeleteOrderDetail(c, db.DB) })
	}

	// Start the server
	log.Fatal(r.Run(":8080"))
}
