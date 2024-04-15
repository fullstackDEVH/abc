APP_NAME=emagic-webapp
DOCKER_BIN=docker
GIT_SHA_FETCH:=$(shell git rev-parse HEAD | cut -c 1-8)
REGISTRY_NAME=phuclb1
build-image:
	${DOCKER_BIN} build -f build/Dockerfile -t $(REGISTRY_NAME)/$(APP_NAME):$(GIT_SHA_FETCH) .

push-image:
	${DOCKER_BIN} push $(REGISTRY_NAME)/$(APP_NAME):$(GIT_SHA_FETCH)

make-test:
	echo "Test"