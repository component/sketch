
build: index.js sketch.css components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean
