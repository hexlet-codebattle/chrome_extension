install:
	npm install

develop:
	npm run watch:dev

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

make lint-fix:
	npx eslint . --fix