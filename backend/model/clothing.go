package model

import "gorm.io/gorm"

type Clothing struct {
	gorm.Model
	Name     string `json:"name" gorm:"not null"`
	Category string `json:"category" gorm:"not null"`
}
