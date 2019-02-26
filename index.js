#!/usr/bin/env node

const helpers = require('./helpers.js')
const chalk = require('chalk');

if (require.main === module) {
  // PARA IDENTIFICAR QUÉ FUE LO QUE INGRESÓ EL USUARIO EN LA TERMINAL
  // TODO LO QUE TENGA "--" AL INICIO SE GUARDA EN OPCIONES
  // LO DEMÁS SE GUARDA EN EN LAS RUTAS A ANALIZAR
  let filePath = [];
  let options = [];
  for (let i = 2; i < process.argv.length; i++) {
    if ( process.argv[i].indexOf("--") !== 0) {
      filePath.push(process.argv[i])
    } else {
      options.push(process.argv[i])
    }
  }
  // SI EL USUARIO NO INGRESÓ OPCIONES O SI SOLO INGRESÓ OPCIONES NO VÁLIDAS
  // SE APLICA EL PROGRAMA BASE, SOLO INDICA LOS LINKS QUE ENCONTRO EN LOS ARCHIVOS ANALIZADOS
  // INDICANDO LA LINEA Y EL ARCHIVO AL QUE PERTENECE
  if (options.indexOf("--validate") === -1 && options.indexOf("--stats") === -1) {
    // console.log("no valid options")
    Promise.all(filePath.map(file => helpers.overall(file)))
    .then(linksArr => {
      linksArr.forEach(elem => {
        elem.forEach(link => {
          console.log(chalk.white(`Line ${link.line} of file ${link.file}: ${link.link}`))
        })
      })
    })
  }
  // SI EL USUARIO NO INGRESO NINGUNA RUTA...
  if (filePath.length === 0) {
    console.log("You must enter a path for the program to extract the links from, must be a folder or .md file")
  }
  // Y AHORA SI EL USUAIRO SI INGRESÓ OPCIONES VALIDAS Y RUTA VALIDA
  // HAY QUE DISTINGUIR QUE OPCIONES INGRESÓ
  if (options.indexOf("--validate") !== -1){
    return new Promise((resolve, reject)=> {
      Promise.all(filePath.map(file => helpers.overall(file)))
      // .then(linksArr => {
      //   linksArr.forEach(elem => {
      //     elem.forEach(link => {
      //       console.log(chalk.white(`Line ${link.line} of file ${link.file}: ${link.link}`))
      //     })
      //   })
      // })
      .then(data => {
        // console.log(data)
        return [data[0],  data[0].map(link => {
          return helpers.validateLink(link)
      })]
      })
      .then(validatedData => {
        Promise.all(validatedData[1])
        .then(validationsResolved => {
          let completeData = validatedData[0];
          for (let i = 0; i<validatedData[1].length; i++) {
            completeData[i].validation = validationsResolved[i]
          }
          return resolve(completeData);
  
        })
      })
      
    })
    .then(data2 => {
      console.log(data2)
    })

  }
  
  // console.log("file path >"+filePath);
  // console.log("options >"+options)
}


module.exports = (userPath) => {
  return helpers.overall(userPath)
} 

  
  

