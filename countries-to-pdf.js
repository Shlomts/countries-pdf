import fs from "fs"
import PDFDocument from "pdfkit-table"
import { utilService } from "./util.service.js"

// init document
let doc = new PDFDocument({ margin: 30, size: "A4" })

// connect to a write stream
doc.pipe(fs.createWriteStream("./countries.pdf"))

createPdf().then(() => doc.end()) // close document

function getCountries() {
    return utilService.readJsonFile("countries.json").then((countriesArr) =>
        countriesArr.sort((a, b) => {
            const x = a.name.common
            const y = b.name.common
            return x < y ? -1 : x > y ? 1 : 0
        })
    )
}

function createPdf() {
    return getCountries().then((countries) => {
        const table = {
            title: "Countries",
            subtitle: "Sorted by name",
            headers: ["Country", "Capital", "Population"],
            rows: [],
        }

        table.rows = countries.map((country) => [
            country.name.common,
            country.capital ? country.capital[0] : " ",
            country.population,
        ])

        return doc.table(table, { columnsSize: [200, 100, 100] })
    })
}
