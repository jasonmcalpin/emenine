

ifndef VERBOSE
.SILENT:
endif
PROJECT_DIR := $(shell pwd)
DATE_NOW := $(shell date -u +"%Y-%m-%dT%H-%M-%SZ")

.PHONY: build
build:
	echo "laravel configs updated"
	docker-compose up
	cd SourceCode && docker-compose exec app php artisan migrate --seed
	cd SourceCode && docker-compose exec app php artisan make:controller MyController
	cd SourceCode && docker-compose exec app php artisan key:generate
	docker-compose stop

.PHONY: up
up:
	echo "Docker containers loading ..."
	docker-compose up -d
	
	
.PHONY: down stop end
down stop end:
	echo "Docker containers exiting ..."
	docker-compose stop

