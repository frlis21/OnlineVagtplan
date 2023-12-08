SRC := $(wildcard *.tex)
DIAGRAMS := C41.eps C42.eps C43.eps

report.pdf: $(SRC) $(DIAGRAMS)
	latexmk -silent -pdf -latexoption="--shell-escape" -f report.tex

$(DIAGRAMS): C4.puml
	plantuml -teps $^
