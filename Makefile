install:
	npm install

develop:
	npm run watch:dev

build:
	npm run build && cp ./manifest.json ./dist

lint:
	npx eslint . --ext js,jsx

lint-fix:
	npx eslint . --fix

cypress:
	npm run cypress

.PHONY: cypress