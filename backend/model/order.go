package model

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	Name       string `json:"name" gorm:"not null"`
	IsComplete bool   `json:"is_complete" gorm:"default:false"`
}
