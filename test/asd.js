const mdLinks = require('../index.js')
const helpers = require('../helpers')

// mdLinks(['../node_modules/chalk'],{validate:true})
// .then(console.log)
mdLinks(['../READMELab.md'], {validation:true})
.then(data=> {
    console.log(data)
    console.log(data.length)
})