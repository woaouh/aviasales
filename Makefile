install:
	npm ci

start:
	npm start

editorconfig:
	npm run editorconfig

lint:
	npm run lint

lint-styles:
	npm run lint-styles

lint-styles-fix:
	npm run lint-styles-fix

test:
	npm test

push: editorconfig lint lint-styles
	git push
