package controller

import (
	"laundry-ledger/model"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllOrderDetails(c *gin.Context, db *gorm.DB) {
	var orderDetails []model.OrderDetail
	db.Preload("Clothing").Preload("Order").Find(&orderDetails)

	if len(orderDetails) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No order detail found"})
		return
	}

	c.JSON(http.StatusOK, orderDetails)
}

func GetOrderDetailByID(c *gin.Context, db *gorm.DB) {
	var orderDetail model.OrderDetail
	id := c.Param("id")
	if err := db.Preload("Clothing").Preload("Order").First(&orderDetail, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order detail not found"})
		return
	}
	c.JSON(http.StatusOK, orderDetail)
}

func GetOrderDetailByOrderID(c *gin.Context, db *gorm.DB) {
	var orderDetails []model.OrderDetail
	var order model.Order
	orderID := c.Param("id")

	// Check if the order exists
	if err := db.First(&order, orderID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	// Fetch all OrderDetails where the order_id matches
	if err := db.Preload("Clothing").Where("order_id = ?", orderID).Find(&orderDetails).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order details not found"})
		return
	}

	// Return the list of OrderDetails
	c.JSON(http.StatusOK, orderDetails)
}

func CreateOrderDetail(c *gin.Context, db *gorm.DB) {
	var orderDetail model.OrderDetail
	if err := c.ShouldBindJSON(&orderDetail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var errMessages []string

	var clothing model.Clothing
	if err := db.First(&clothing, orderDetail.ClothingID).Error; err != nil {
		errMessages = append(errMessages, "Clothing with that ID does not exist")
	}

	var order model.Order
	if err := db.First(&order, orderDetail.OrderID).Error; err != nil {
		errMessages = append(errMessages, "Order with that ID does not exist")
	}

	if len(errMessages) > 0 {
		c.JSON(http.StatusNotFound, gin.H{"errors": errMessages})
		return
	}

	db.Create(&orderDetail)
	c.JSON(http.StatusOK, orderDetail)
}

func UpdateOrderDetail(c *gin.Context, db *gorm.DB) {
	var orderDetail model.OrderDetail
	id := c.Param("id")

	if err := db.First(&orderDetail, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order detail not found"})
		return
	}

	if err := c.ShouldBindJSON(&orderDetail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var errMessages []string

	var clothing model.Clothing
	if err := db.First(&clothing, orderDetail.ClothingID).Error; err != nil {
		errMessages = append(errMessages, "Clothing with that ID does not exist")
	}

	var order model.Order
	if err := db.First(&order, orderDetail.OrderID).Error; err != nil {
		errMessages = append(errMessages, "Order with that ID does not exist")
	}

	if len(errMessages) > 0 {
		c.JSON(http.StatusNotFound, gin.H{"errors": errMessages})
		return
	}

	db.Save(&orderDetail)
	c.JSON(http.StatusOK, orderDetail)
}

func DeleteOrderDetail(c *gin.Context, db *gorm.DB) {
	var orderDetail model.OrderDetail
	id := c.Param("id")

	if err := db.First(&orderDetail, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order detail not found"})
		return
	}

	db.Delete(&orderDetail)
	c.JSON(http.StatusOK, gin.H{"message": "Order detail deleted successfully"})
}
