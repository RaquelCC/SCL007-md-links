// const mdLinks = require('./index.js');
// // let userPath = process.argv[2];
// // console.log(userPath)
// mdLinks(process.argv[2])
const helpers = require('./helpers.js')
// import { readMDFile } from './index.js'
const mdLinks = require('./index.js')

//PRUEBA 1
mdLinks('.')
.then(data => {
    console.log(data.length)
    let validations = []
    data.forEach(link => {
        validations.push(helpers.validateLink(link))
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

// mdLinks('./node_modules/node-fetch/README.md')
// mdLinks('.')
// .then(data => {
//     console.log(data)
//     // data.forEach(link => {
//     //     console.log(link)
//     // })
// })


