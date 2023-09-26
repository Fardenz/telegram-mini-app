.PHONY: test
build:
	docker compose build

start:
	docker compose up

stop:
	docker compose stop

down:
	docker compose down

format:
	docker compose run --rm api-seed npm run format 

lint-fix:
	docker compose run --rm api-seed npm run lint-fix

before-commit:
	make format && make lint-fix