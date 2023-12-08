# OnlineVagtplan

DM571 software engineering project

## How to build

You will need:
- Node 18 or 20, maybe 21 will work?
- npm

Clone this repository,
`cd` into it,
and run `npm install && npm run dev`.

Run tests with `npm run test`
and get coverage reports with `npm run coverage`.

## How to build the report

You will need:
- `make`
- Ghostscript (for the C4 diagrams -> eps -> pdf -> figures)
- PlantUML
- A (larger) distribution of LaTeX with `latexmk`

Simply run `make` in the `report` directory.
