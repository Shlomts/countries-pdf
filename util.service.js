import fs from 'fs'

export const utilService = {
    readJsonFile,
}

function readJsonFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, contents) => {
            if (err) reject(err)
            else {
                const data = JSON.parse(contents)
                resolve (data)
            }
        })
    })
}
