// const mdLinks = require('./index.js');
// // let userPath = process.argv[2];
// // console.log(userPath)
// mdLinks(process.argv[2])

// import { readMDFile } from './index.js'
const mdLinks = require('./helpers.js')

mdLinks.getLinks('./README.md')
.then(data => {
    data.forEach(link => {
        console.log(`line ${link.line} of file '${link.file}': ${link["link"]}`)
    })
})
