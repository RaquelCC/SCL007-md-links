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
  if (options.indexOf("--validate") === -1 && options.indexOf("--stats") === -1 && filePath.length>0) {
    Promise.all(filePath.map(file => helpers.overall(file)))
    .then(linksArr => {
      linksArr.forEach(elem => {
        elem.forEach(link => {
          console.log(chalk.yellowBright("Line "+link.line)+chalk.cyan(" of file "+link.file+": ")+chalk.white(link.link))
        })
      })
    })
  }
  // SI EL USUARIO NO INGRESO NINGUNA RUTA...
  if (filePath.length === 0) {
    console.log(chalk.redBright("You must enter a path for the program to extract the links from, must be a folder or .md file"))
    return
  }
  // Y AHORA SI EL USUAIRO SI INGRESÓ OPCIONES VALIDAS Y RUTA VALIDA
  // HAY QUE DISTINGUIR QUE OPCIONES INGRESÓ
  if (options.indexOf("--validate") !== -1 && filePath.length>0){
    return new Promise((resolve, reject)=> {
      Promise.all(filePath.map(file => helpers.overall(file)))
      .then(data => {
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
      data2.forEach(item=> {
        console.log(`${chalk.yellowBright("Line "+ item.line)} ${chalk.cyan("of file '" +item.file+"': ")} ${chalk.white(item.link)} ${item.validation === true? chalk.green("WORKING"): chalk.red("BROKEN")}`)
      })
      if(options.indexOf("--stats") !== -1){
        console.log(chalk.magentaBright(`Links: ${data2.length}.`))
        console.log(chalk.magentaBright(`Working: ${data2.filter(item=>{
          if(item.validation === true) {
            return item
          }
        }).length}.`))
        console.log(chalk.magentaBright(`Broken: ${data2.filter(item=>{
          if(item.validation === false) {
            return item
          }
        }).length}.`))
      }
    })

  }
  
}


module.exports = (userPath) => {
   return new Promise((resolve, reject)=> {
      Promise.all(userPath.map(file => helpers.overall(file)))
      .then(data => {
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
} 

  
  

