install:
	npm install

start:
	npm start

lint:
	./node_modules/.bin/eslint . --ext .js --ext .jsx

lint-styles:
	./node_modules/.bin/stylelint "src/**/*.scss"

lint-styles-fix:
	./node_modules/.bin/stylelint "src/**/*.scss" --fix

test:
	npm test

push: lint lint-styles
	git push