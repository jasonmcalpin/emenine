ifndef VERBOSE
.SILENT:
endif
PROJECT_DIR := $(shell pwd)
DATE_NOW := $(shell date -u +"%Y-%m-%dT%H-%M-%SZ")

.PHONY: build_image
build_image:
	echo "Docker image building ..." 
ifneq ($(wildcard $(PROJECT_DIR)/SourceCode/src/build/.*),)
	docker build -t "DOCKERHTMLTEMPLATE" .
else
	npm run build --prefix $(PROJECT_DIR)/SourceCode/src/
	docker build -t "DOCKERHTMLTEMPLATE" .
endif

.PHONY: up
up:
	echo "Docker containers loading ..."
	docker-compose -f docker-compose.yml -p local up -d

.PHONY: down stop end
down stop end:
	echo "Docker containers exiting ..."
	docker-compose -f docker-compose.yml -p local stop

