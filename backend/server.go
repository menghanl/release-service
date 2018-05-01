package main

import (
	"context"
	"flag"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/menghanl/release-note-gen/ghclient"
	"golang.org/x/oauth2"
)

var token = flag.String("token", "", "github token")

var tc *http.Client

func releaseHandler(c *gin.Context) {
	org := c.DefaultQuery("org", "grpc")
	repo := c.DefaultQuery("repo", "grpc-go")
	version := c.DefaultQuery("version", "1.12")
	prs := ghclient.New(tc, org, repo).
		GetMergedPRsForMilestone(version[1:] + " Release")

	c.JSON(200, prs)
}

func main() {
	flag.Parse()
	if *token != "" {
		ctx := context.Background()
		ts := oauth2.StaticTokenSource(
			&oauth2.Token{AccessToken: *token},
		)
		tc = oauth2.NewClient(ctx, ts)
	}

	r := gin.Default()
	path, _ := filepath.Abs("./dist")
	r.Use(static.Serve("/", static.LocalFile(path, true)))
	r.LoadHTMLGlob(filepath.Join(path, "index.html"))
	r.NoRoute(func(c *gin.Context) {
		path := strings.Split(c.Request.URL.Path, "/")
		if path[1] != "release" {
			c.JSON(http.StatusNotFound, gin.H{"msg": "no route", "body": nil})
		} else {
			c.HTML(http.StatusOK, "index.html", "")
		}
	})

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})
		api.GET("/release", releaseHandler)
	}
	r.Run(":8080")
}
