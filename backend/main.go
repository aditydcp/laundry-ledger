package main

import (
	"log"
	"net/http"

	"laundry-ledger/db"
	"laundry-ledger/model"

	"github.com/gin-gonic/gin"
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

	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func main() {
	// Initialize database
	db.InitDB()

	// Create Gin router
	r := gin.Default()

	// Define routes for signup and login
	r.POST("/signup", Signup)
	r.POST("/login", Login)

	// Start the server
	log.Fatal(r.Run(":8080"))
}
