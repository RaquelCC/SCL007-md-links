#!/usr/bin/env node

//const chalk = require('chalk');
const path = require('path');
const helpers = require('./helpers.js');

// if (require.main === module) {
//   // PARA IDENTIFICAR QUÉ FUE LO QUE INGRESÓ EL USUARIO EN LA TERMINAL
//   // TODO LO QUE TENGA "--" AL INICIO SE GUARDA EN OPCIONES
//   // LO DEMÁS SE GUARDA EN EN LAS RUTAS A ANALIZAR
//   const filePath = [];
//   const options = [];
//   for (let i = 2; i < process.argv.length; i += 1) {
//     if (process.argv[i].indexOf('--') !== 0) {
//       filePath.push(process.argv[i]);
//     } else {
//       options.push(process.argv[i]);
//     }
//   }
//   // SI EL USUARIO NO INGRESÓ OPCIONES O SI SOLO INGRESÓ OPCIONES NO VÁLIDAS
//   // SE APLICA EL PROGRAMA BASE, SOLO INDICA LOS LINKS QUE ENCONTRO EN LOS ARCHIVOS ANALIZADOS
//   // INDICANDO LA LINEA Y EL ARCHIVO AL QUE PERTENECE
//   if (options.indexOf('--validate') === -1 && options.indexOf('--stats') === -1 && filePath.length > 0) {
//     Promise.all(filePath.map(file => helpers.overall(file)))
//       .then((linksArr) => {
//         linksArr.forEach((elem) => {
//           elem.forEach((link) => {
//             console.log(chalk.yellowBright(`Line ${link.line}`) + chalk.cyan(` of file ${link.file}: `) + chalk.white(link.link));
//           });
//         });
//       });
//   }
//   // SI SOLO PATH Y --STATS
//   if (options.indexOf('--validate') === -1 && options.indexOf('--stats') !== -1 && filePath.length > 0) {
//     Promise.all(filePath.map(file => helpers.overall(file)))
//       .then((linksArr) => {
//         linksArr.forEach((elem) => {
//           elem.forEach((link) => {
//             console.log(chalk.yellowBright(`Line ${link.line}`) + chalk.cyan(` of file ${link.file}: `) + chalk.white(link.link));
//           });
//           console.log(chalk.magentaBright(`Links: ${elem.length}.`));
//         });
//       });
//   }
//   // SI EL USUARIO NO INGRESO NINGUNA RUTA...
//   if (filePath.length === 0) {
//     console.log(chalk.redBright('You must enter a path for the program to extract the links from, must be a folder or .md file'));
//   }
//   // Y AHORA SI EL USUAIRO SI INGRESÓ OPCIONES VALIDAS Y RUTA VALIDA
//   // HAY QUE DISTINGUIR QUE OPCIONES INGRESÓ
//   if (options.indexOf('--validate') !== -1 && filePath.length > 0) {
//     new Promise((resolve) => {
//       Promise.all(filePath.map(file => helpers.overall(file)))
//         .then(data => [data[0], data[0].map(link => helpers.validateLink(link))])
//         .then((validatedData) => {
//           Promise.all(validatedData[1])
//             .then((validationsResolved) => {
//               const completeData = validatedData[0];
//               for (let i = 0; i < validatedData[1].length; i += 1) {
//                 completeData[i].validation = validationsResolved[i];
//               }
//               return resolve(completeData);
//             });
//         });
//     })
//       .then((data2) => {
//         data2.forEach((item) => {
//           console.log(`${chalk.yellowBright(`Line ${item.line}`)} ${chalk.cyan(`of file '${item.file}': `)} ${chalk.white(item.link)} ${item.validation === true ? chalk.green('WORKING') : chalk.red('BROKEN')}`);
//         });
//         if (options.indexOf('--stats') !== -1) {
//           console.log(chalk.magentaBright(`Links: ${data2.length}.`));
//           console.log(chalk.magentaBright(`Working: ${data2.filter((item) => {
//             if (item.validation === true) {
//               return item;
//             }
//           }).length}.`));
//           console.log(chalk.magentaBright(`Broken: ${data2.filter((item) => {
//             if (item.validation === false) {
//               return item;
//             }
//           }).length}.`));
//         }
//       });
//   }
// }


module.exports = (userPath, options = {validate: false}) => {
  // if(fs.statSync(path.resolve(path.dirname(require.main.filename), userPath)).isFile() && path.resolve(path.dirname(require.main.filename) !== '.md')){
  //   return resolve([])
  // }
  const userPath2 = userPath.map(item => path.resolve(path.dirname(require.main.filename), item));
  // console.log(userPath2)
  return new Promise((resolve) => {
    if (options.validate === false){
      Promise.all(userPath2.map(file => helpers.overall(file)))
      .then(data => {
        return resolve(data.reduce((acc,current)=> {
          return acc.concat(current)
      }))
      })
    }
    Promise.all(userPath2.map(file => helpers.overall(file)))
      .then(data => [data[0], data[0].map(link => helpers.validateLink(link))])
      .then((validatedData) => {
        Promise.all(validatedData[1])
          .then((validationsResolved) => {
            const completeData = validatedData[0];
            for (let i = 0; i < validatedData[1].length; i += 1) {
              completeData[i].validation = validationsResolved[i];
            }
            return resolve(completeData);
          });
      });
  })
  .catch(err=> {
    return Promise.resolve([])
  })
};


