# DOCKER
ps:
	docker-compose ps
build:
	docker-compose up -d --build
up:
	docker-compose up -d
down:
	docker-compose down -v

# MIGRATION
migrationGen:
	npx typeorm migration:generate -n migration_20_07 $(n)
migrate:
	npx typeorm migration:run

#SEED
seedConfig:
	yarn seed:config
seedRun:
	yarn seed:run
seedRunOne:
	yarn seed:runOne $(class)

# GIT
updateSrc:
	git stash
	git pull origin develop
	git stash pop