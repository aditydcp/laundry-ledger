package main

import (
	"log"
	"net/http"

	"laundry-ledger/db"
	"laundry-ledger/helper"
	"laundry-ledger/middleware"
	"laundry-ledger/model"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func Signup(c *gin.Context) {
	var user model.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save user to database
	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func Login(c *gin.Context) {
	var request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var user model.User

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if user exists
	if err := db.DB.Where("email = ?", request.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Email not registered"})
		return
	}

	// Verify password
	if request.Password != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong email or passsword"})
		return
	}

	// Generate JWT token upon successful login
	token, err := helper.GenerateJWT(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Return the token in the response
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   token,
	})
}

func Dashboard(c *gin.Context) {
	userID := c.MustGet("user_id").(float64) // Extract the user_id from the JWT claims

	// You can now use the userID to fetch user-specific data from the database
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to your dashboard", "user_id": userID})
}

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
	r.POST("/signup", Signup)
	r.POST("/login", Login)

	// Protected routes using the AuthMiddleware
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/dashboard", Dashboard) // Protected route
	}

	// Start the server
	log.Fatal(r.Run(":8080"))
}
