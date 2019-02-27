const mdLinks = require('../index.js');
const chai = require('chai');
const helpers = require('../helpers.js')


describe('mdLinks', () => {

  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería retornar una promesa, cuyo resolve sea un array de objetos, y cada objeto contenga la información del link, linea, archivo y validación', async () => {
    const res = await mdLinks(['../README.md'])
    const primerLink = {"file": "C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\README.md", "line": 5, "link": "https://es.wikipedia.org/wiki/Markdown", "validation": true
    }
    chai.assert.deepEqual(res[0],primerLink)
  });

  it('Debería recorrer todas las carpetas y archivos .md de la ruta que ingrese el usuario', async () => {
    const res = await mdLinks(['../node_modules/chalk'])
    const primerLink = { link: 'https://github.com/qix-',
    line: 309,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\node_modules\\chalk\\readme.md',
    validation: true }
    chai.assert.deepEqual(res[res.length-1],primerLink)
  });

  // it('El resolve de la promesa debería retornar la cantidad de links que contiene el archivo .md analizado', () => {
  //   console.log('FIX ME!');
  // });

  // it('El resolve de la promesa debería retornar los links que contiene el archivo .md analizado', () => {
  //   console.log('FIX ME!');
  // });

  // it('Al aplicar la opción "validate" , el resolve de la promesa debería indicar qué links estan rotos', () => {
  //   console.log('FIX ME!');
  // });

  // COMENTADOS LOS TESTS QUE SON PARA UNA SIGUIENTE VERSION DE MD-LINKS

  // it('Si el path provisto por el usuario es una carpeta, debería analizar todos los archivos .md en esa carpeta', () => {
  //   console.log('FIX ME!');
  // });

  // it('Si el path provisto por el usuario es una carpeta, debería analizar las sub-carpetas de esta buscando archivos .md para analizar', () => {
  //   console.log('FIX ME!');
  // });

  // it('Al aplicar la opción "line" debería indicar la linea en que se encuentra el archivo roto', () => {
  //   console.log('FIX ME!');
  // });

  // it('Al analizar multiples archivos .md debería indicar qué links pertenecen a qué archivo', () => {
  //   console.log('FIX ME!');
  // });

});

describe('helpers', () => {

  it('Debería ser un pobjeto', () => {
    expect(typeof helpers).toBe('object');
  });

  it('helpers.getLinks debería retornar una promesa cuyo resolve sea un arreglo de objetos que contenga los links, el archivo y la linea', async () => {
    const res = await helpers.getLinks('../README.md')
    const primerLink = {"link": "https://es.wikipedia.org/wiki/Markdown", "line": 5, "file": "C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\README.md" 
    }
    chai.assert.deepEqual(res[0],primerLink)
  });

});
