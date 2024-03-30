PLANTUML=docker run --rm --user $$(id -u):$$(id -g) -v ./:/data/ plantuml/plantuml
# PLANTUML=java -jar ~/Downloads/plantuml-1.2023.11.jar

WSD=$(wildcard static-src/diagrams/*.wsd)
LIGHTSVG=$(patsubst static-src/diagrams/%.wsd, static/diagrams/light/%.svg, $(WSD))
DARKSVG=$(patsubst static-src/diagrams/%.wsd, static/diagrams/dark/%.svg, $(WSD))
LIGHTPNG=$(patsubst static-src/diagrams/%.wsd, static/diagrams/light/%.png, $(WSD))
DARKPNG=$(patsubst static-src/diagrams/%.wsd, static/diagrams/dark/%.png, $(WSD))

REKAPAGER_SRC=$(wildcard static-src/rekapager/*.png)
REKAPAGER_DST=$(patsubst static-src/rekapager/%.png, static/rekapager/%.png, $(REKAPAGER_SRC))

all: svg static/img/social.png

static/img/social.png: src/images/social.svg
	inkscape -o $@ -w 1200 -h 600 $<

.PHONY: svg
svg: $(LIGHTSVG) $(DARKSVG)

.PHONY: png
png: $(LIGHTPNG) $(DARKPNG)

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

.PHONY: static/diagrams/light/%.svg
static/diagrams/light/%.svg: static-src/diagrams/%.wsd
	$(PLANTUML) -tsvg -SbackgroundColor=transparent $< -o ../../static/diagrams/light/

.PHONY: static/diagrams/dark/%.svg
static/diagrams/dark/%.svg: static-src/diagrams/%.wsd
	$(PLANTUML) -tsvg -darkmode -SbackgroundColor=transparent $< -o ../../static/diagrams/dark/

.PHONY: static/diagrams/light/%.png
static/diagrams/light/%.png: static-src/diagrams/%.wsd
	$(PLANTUML) -tpng -SbackgroundColor=transparent $< -o ../../static/diagrams/light/

.PHONY: static/diagrams/dark/%.png
static/diagrams/dark/%.png: static-src/diagrams/%.wsd
	$(PLANTUML) -tpng -darkmode -SbackgroundColor=transparent $< -o ../../static/diagrams/dark/

.PHONY: rekapager
rekapager: $(REKAPAGER_DST)

.PHONY: static/rekapager/%.png
static/rekapager/%.png: static-src/rekapager/%.png
	convert $< -alpha set -fuzz 3% -transparent '#ffffff' -shave 60x60 -resize 25% $@