package main

import (
	"net/http"

	kosUser "kos/modules/user"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// e.GET("/user/:id", getUser)
func getUser(c echo.Context) error {
	// User ID from path `users/:id`
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//TODO: use JWT auth module, here ...

	//Register module routes
	kosUser.RegisterRoutes(e, "/user")

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Reached KOS root. Use module rest paths!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
