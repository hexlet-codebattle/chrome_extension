install:
	npm install

develop:
	npm run watch:dev

develop-prod:
	npm run watch

build:
	npm run build && cp ./manifest.json ./dist

lint:
	npx eslint . --ext js,jsx

make lint-fix:
	npx eslint . --fix

test:
	npx jest

test-watch:
	npx jest --watch