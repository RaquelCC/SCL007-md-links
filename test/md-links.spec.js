const mdLinks = require('../index.js');
const chai = require('chai');
const helpers = require('../helpers.js')


describe('mdLinks', () => {

  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debería retornar un arreglo vacio si se entrega como parametro un archivo que no es .md',async  () => {
    const res = await mdLinks(['../index.js'])
    chai.assert.deepEqual(res,[])
  });

  it('Debería retornar un arreglo vacio si se entrega como parametro una ruta inexistente',async  () => {
    const res = await mdLinks(['./index.js'])
    chai.assert.deepEqual(res,[])
  });

  it('Debería retornar una promesa, cuyo resolve sea un array de objetos, y cada objeto contenga la información del link, linea, archivo y validación', async () => {
    const res = await mdLinks(['../READMELab.md'],{validate : true})
    const primerLink = {"mdText": '[Markdown]',"file": "C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md", "line": 5, "link": "https://es.wikipedia.org/wiki/Markdown", "validation": true
    }
    chai.assert.deepEqual(res[0],primerLink)
  });

  it('Debería recorrer todas las carpetas y archivos .md de la ruta que ingrese el usuario', async () => {
    const res = await mdLinks(['../node_modules/chalk']);
    const primerLink = { 
    mdText: '[Josh Junon]',
    link: 'https://github.com/qix-',
    line: 309,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\node_modules\\chalk\\readme.md'};
    chai.assert.deepEqual(res[res.length-1],primerLink);
  });

  it('Debería recorrer todas las carpetas y archivos .md de la ruta que ingrese el usuario, y entregar la validación de los links si el usuario puso {validate:true} en las opciones', async () => {
    const res = await mdLinks(['../node_modules/chalk'], {validate : true});
    const primerLink = { 
    mdText: '[Josh Junon]',
    link: 'https://github.com/qix-',
    line: 309,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\node_modules\\chalk\\readme.md',
    validation: true };
    chai.assert.deepEqual(res[res.length-1],primerLink);
  });
  
});

describe('helpers', () => {

  it('Debería ser un objeto', () => {
    expect(typeof helpers).toBe('object');
  });

  it('helpers.getLinks debería retornar una promesa cuyo resolve sea un arreglo de objetos que contenga los links, el archivo y la linea', async () => {
    const res = await helpers.getLinks('../READMELab.md')
    const primerLink = {"mdText": '[Markdown]',"link": "https://es.wikipedia.org/wiki/Markdown", "line": 5, "file": "C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md" 
    }
    chai.assert.deepEqual(res[0],primerLink)
  });

});


