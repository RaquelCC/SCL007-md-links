// const mdLinks = require('./index.js');
// // let userPath = process.argv[2];
// // console.log(userPath)
// mdLinks(process.argv[2])

// import { readMDFile } from './index.js'
const mdLinks = require('./helpers.js')

mdLinks.getLinks('./README.md')
.then(data => {
    console.log(data.length)
    let validations = []
    data.forEach(link => {
        validations.push(mdLinks.validateLink(link))
    })
    return [data, validations]
})
.then(data => {
    Promise.all(data[1])
    .then(res => {
        for(let i = 0; i < data[0].length; i++) {
            console.log(`line ${data[0][i].line} of file '${data[0][i].file}': ${data[0][i]["link"]} ${res[i]}`)
        }       
    })
})

// mdLinks.validateLink(data[0]).then(data => console.log(data))