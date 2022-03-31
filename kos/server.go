package main

import (
	"net/http"

	kosUser "kos/modules/user"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type RouteRegisterFunc func(*echo.Echo, string)

const API_V1 = "/api/v1"

var routeHandlers = map[string]RouteRegisterFunc{
	API_V1 + "/user": kosUser.RegisterRoutes,
	// Add other modules, here..
}

func registerAPIs(e *echo.Echo) {
	for k, v := range routeHandlers {
		v(e, k)
	}
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//TODO: use JWT auth module, here ...

	//Register module routes
	registerAPIs(e)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Reached KOS root. Use module api paths!")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
