const fs = require('fs');
const path = require('path');
const helpers = require('./helpers.js')
// module.exports = function mdLinks (userPath) {
//   // console.log(path.extname(userPath))
  
//   // ESTE VA A SER EL STOP (?)
//   if (fs.statSync(userPath).isFile() && path.extname(userPath) === '.md') {
//     return console.log("it's an .MD file")
//   }
// }

module.exports = (userPath) => {
  return helpers.overall(userPath)
} 

  
  

