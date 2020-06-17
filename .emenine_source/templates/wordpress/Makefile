

ifndef VERBOSE
.SILENT:
endif
PROJECT_DIR := $(shell pwd)
DATE_NOW := $(shell date -u +"%Y-%m-%dT%H-%M-%SZ")

.PHONY: build_image
build_image:
	echo "Docker image building ..."
	docker build -t "DOCKERWORDPRESSTEMPLATE" .

.PHONY: up
up:
	echo "Docker containers loading ..."
	docker-compose -f docker-compose.yml -p local up -d
.PHONY: down stop end
down stop end:
	echo "Docker containers exiting ..."
	docker-compose -f docker-compose.yml -p local stop

