APP_NAME=emagic-webapp
DOCKER_BIN=/usr/local/bin/docker
GIT_SHA_FETCH:=$(shell git rev-parse HEAD | cut -c 1-8)
build-image:
	${DOCKER_BIN} build -f build/Dockerfile -t phuclb1/$(APP_NAME):$(GIT_SHA_FETCH) .

push-image:
	${DOCKER_BIN} push phuclb1/$(APP_NAME):$(GIT_SHA_FETCH)