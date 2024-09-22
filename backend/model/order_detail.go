package model

import "gorm.io/gorm"

type OrderDetail struct {
	gorm.Model
	ClothingID uint     `json:"clothing_id" gorm:"not null"`
	OrderID    uint     `json:"order_id" gorm:"not null"`
	Clothing   Clothing `gorm:"foreignKey:ClothingID"`
	Order      Order    `gorm:"foreignKey:OrderID"`
}
