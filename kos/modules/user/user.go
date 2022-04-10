package user

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// User
type User struct {
	ID    string
	Name  string `json:"name" xml:"name"`
	Email string `json:"email" xml:"email"`
}

func New(id string) *User {
	u := &User{
		ID:   id,
		Name: "User" + id,
	}
	u.Email = u.Name + "@kos.org"
	return u
}

func jsonResponse(obj interface{}, c echo.Context) error {
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSONCharsetUTF8)
	return c.JSON(http.StatusOK, obj)
}

// e.GET("/user/:id", getUser)
func GetUser(c echo.Context) error {
	// User ID from path `users/:id`
	id := c.Param("id")
	u := New(id)
	return c.JSON(http.StatusOK, u)
}

func RegisterRoutes(e *echo.Echo, prefix string) {
	e.GET(prefix+"/:id", GetUser)
}
