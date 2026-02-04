package domain

import "time"

// User represents a system user
type User struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// UserRepository interface defines data access methods
type UserRepository interface {
	GetByID(id string) (*User, error)
	Create(user *User) error
}

// UserUsecase interface defines business logic methods
type UserUsecase interface {
	GetProfile(id string) (*User, error)
	Register(email, name, password string) error
}
