import fs from "fs"
import PDFDocument from "pdfkit-table"
import { utilService } from "./util.service.js"

getCountries()

function getCountries() {
    const countries = utilService
        .readJsonFile("countries.json")
        .then( countriesArr => createPdf(countriesArr))
}

// init document
let doc = new PDFDocument({ margin: 30, size: "A4" })

// connect to a write stream
doc.pipe(fs.createWriteStream("./countries.pdf"))

createPdf(doc).then(() => doc.end()) // close document

function createPdf(data) {
    const table = {
        title: "Countries",
        subtitle: "Sorted by name",
        headers: ["Country", "Capital", "Population"],
        rows: [
            ['Donni', '22', '10'],
            ['Ronni', '25', '9'],
            ['Boris', '27', '10'],
        ],
    }
    return doc.table(table, { columnsSize: [200, 100, 100] })
}
