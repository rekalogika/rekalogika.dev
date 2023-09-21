PLANTUML=docker run --rm --user $$(id -u):$$(id -g) -v ./:/data/ plantuml/plantuml
# PLANTUML=java -jar ~/Downloads/plantuml-1.2023.11.jar

WSD=$(wildcard diagrams/*.wsd)
LIGHTSVG=$(patsubst diagrams/%.wsd, static/diagrams/light/%.svg, $(WSD))
DARKSVG=$(patsubst diagrams/%.wsd, static/diagrams/dark/%.svg, $(WSD))
LIGHTPNG=$(patsubst diagrams/%.wsd, static/diagrams/light/%.png, $(WSD))
DARKPNG=$(patsubst diagrams/%.wsd, static/diagrams/dark/%.png, $(WSD))

all: svg

.PHONY: svg
svg: $(LIGHTSVG) $(DARKSVG)

.PHONY: png
png: $(LIGHTPNG) $(DARKPNG)

.PHONY: start
start:
	npx docusaurus start

.PHONY: clean
clean:
	npx docusaurus clear
	rm -f static/diagrams/light/*.svg
	rm -f static/diagrams/dark/*.svg
	rm -rf \?

.PHONY: static/diagrams/light/%.svg
static/diagrams/light/%.svg: diagrams/%.wsd
	$(PLANTUML) -tsvg -SbackgroundColor=transparent $< -o ../static/diagrams/light/

.PHONY: static/diagrams/dark/%.svg
static/diagrams/dark/%.svg: diagrams/%.wsd
	$(PLANTUML) -tsvg -darkmode -SbackgroundColor=transparent $< -o ../static/diagrams/dark/

.PHONY: static/diagrams/light/%.png
static/diagrams/light/%.png: diagrams/%.wsd
	$(PLANTUML) -tpng -SbackgroundColor=transparent $< -o ../static/diagrams/light/

.PHONY: static/diagrams/dark/%.png
static/diagrams/dark/%.png: diagrams/%.wsd
	$(PLANTUML) -tpng -darkmode -SbackgroundColor=transparent $< -o ../static/diagrams/dark/