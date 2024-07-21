PLANTUML=docker run -i --rm plantuml/plantuml

PUML=$(wildcard *.puml */*.puml */*/*.puml */*/*/*.puml */*/*/*/*.puml)
PUML_LIGHT_SVG=$(patsubst %.puml, %.light.svg, $(PUML))
PUML_DARK_SVG=$(patsubst %.puml, %.dark.svg, $(PUML))

REKAPAGER_SRC=$(wildcard static-src/rekapager/*.png)
REKAPAGER_DST=$(patsubst static-src/rekapager/%.png, static/rekapager/%.png, $(REKAPAGER_SRC))

all: static/img/social.png diagrams

static/img/social.png: src/images/social.svg
	inkscape -o $@ -w 1200 -h 600 $<

.PHONY: start
start:
	npx docusaurus start

.PHONY: build
build:
	npx docusaurus build

.PHONY: serve
serve:
	npx docusaurus serve

.PHONY: clean
clean:
	npx docusaurus clear
	rm -f static/diagrams/light/*.svg
	rm -f static/diagrams/dark/*.svg
	rm -rf \?

.PHONY: rekapager
rekapager: $(REKAPAGER_DST)

.PHONY: static/rekapager/%.png
static/rekapager/%.png: static-src/rekapager/%.png
	convert $< -alpha set -fuzz 3% -transparent '#ffffff' -shave 60x60 -resize 25% $@

.PHONY: diagrams
diagrams: $(PUML_LIGHT_SVG) $(PUML_DARK_SVG)

.PHONY: %.light.svg
%.light.svg: %.puml
	$(PLANTUML) -pipe -tsvg -SbackgroundColor=transparent < $< > $@

.PHONY: %.dark.svg
%.dark.svg: %.puml
	$(PLANTUML) -pipe -tsvg -darkmode -SbackgroundColor=transparent < $< > $@