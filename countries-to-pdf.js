import fs from "fs"
import PDFDocument from "pdfkit-table"
import { utilService } from "./util.service.js"

// init document
let doc = new PDFDocument({ margin: 30, size: "A4" })

// connect to a write stream
doc.pipe(fs.createWriteStream("./countries.pdf"))

createPdf(doc).then(() => doc.end()) // close document

function getCountries() {
    return new Promise((resolve, reject) => {
        utilService.readJsonFile("countries.json").then(countriesArr => {
            if (!countriesArr) reject(err)
            let sorted = countriesArr.sort((a, b) => {
                const x = a.name.common
                const y = b.name.common
                return x < y ? -1 : x > y ? 1 : 0
            })
            resolve(sorted)
        })
    })
}

function createPdf() {
    return new Promise((resolve, reject) => {
        getCountries().then(countries => {
            if (!countries) reject(err)
            const table = {
                title: "Countries",
                subtitle: "Sorted by name",
                headers: ["Country", "Capital", "Population"],
                rows: [],
            }

            for (let i = 0; i < countries.length; i++) {
                table.rows.push([
                    countries[i].name.common,
                    countries[i].capital,
                    countries[i].population,
                ])
            }

            resolve(doc.table(table, { columnsSize: [200, 100, 100] }))
        })
    })
}
