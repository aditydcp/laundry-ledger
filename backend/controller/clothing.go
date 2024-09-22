package controller

import (
	"laundry-ledger/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllClothings(c *gin.Context, db *gorm.DB) {
	var clothings []model.Clothing
	db.Find(&clothings)
	c.JSON(http.StatusOK, clothings)
}

func GetClothingByID(c *gin.Context, db *gorm.DB) {
	var clothing model.Clothing
	id := c.Param("id")
	if err := db.First(&clothing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Clothing not found"})
		return
	}
	c.JSON(http.StatusOK, clothing)
}

func CreateClothing(c *gin.Context, db *gorm.DB) {
	var clothing model.Clothing
	if err := c.ShouldBindJSON(&clothing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&clothing)
	c.JSON(http.StatusOK, clothing)
}

func UpdateClothing(c *gin.Context, db *gorm.DB) {
	var clothing model.Clothing
	id := c.Param("id")

	if err := db.First(&clothing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Clothing not found"})
		return
	}

	if err := c.ShouldBindJSON(&clothing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Save(&clothing)
	c.JSON(http.StatusOK, clothing)
}

func DeleteClothing(c *gin.Context, db *gorm.DB) {
	var clothing model.Clothing
	id := c.Param("id")

	if err := db.First(&clothing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Clothing not found"})
		return
	}

	db.Delete(&clothing)
	c.JSON(http.StatusOK, gin.H{"message": "Clothing deleted successfully"})
}
