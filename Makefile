
build: index.js sketch.css components
	@component build

components:
	@component install

clean:
	rm -fr build components

.PHONY: clean
