package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Dashboard(c *gin.Context) {
	userID := c.MustGet("user_id").(float64) // Extract the user_id from the JWT claims

	// You can now use the userID to fetch user-specific data from the database
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to your dashboard", "user_id": userID})
}
