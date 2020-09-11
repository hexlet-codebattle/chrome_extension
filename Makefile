install:
	npm install

develop:
	npm run watch:dev

build:
	npm run build && cp ./manifest.json ./dist