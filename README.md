# MD-LINKS

### INTRODUCCIÓN
`md-links` es un modulo que permite extraer los links de un archivo .md y verificar que estos se encuentren funcionando (no esten rotos). Además entrega al usuario información relevante como el archivo donde se encuentra el link analizado y la linea.

### INSTALACIÓN
Para instalar el modulo debe posicionarse en la carpeta del proyecto en que quiere instalar el modulo y escribir la siguiente linea de comando en la terminal:

De forma local
```
npm install --save https://github.com/RaquelCC/SCL007-md-links
```
De forma global
```
npm install https://github.com/RaquelCC/SCL007-md-links -g
```


### USO COMO MODULO
- `md-links(path [,options])` **devuelve una promesa** cuyo resolve corresponde a un array con objetos, cada objeto representa un link.

    Cada Link tiene las siguientes propiedades:
        
        - link: contiene la url.
        - file: indica el archivo(con ruta absoluta) desde el cual se extrajo el link.
        - line: indica la linea especifica donde está el link dentro del archivo .
        - mdText: indica el texto que acompaña al link entre [].
        - (opcional)validation: indica true si el link funciona y false si no.

- `path:` es un array(arreglo) que contiene la ruta o rutas a analizar, acepta rutas tanto absolutas como relativas, archivos y carpetas.

    Es decir, el parametro de path puede ser tanto:
        
        ['.README.md']   como... ['.README.md', '..']

- `options:` es un objeto que contiene la opción de validación. Por defecto viene con un valor de **false**. Si se configura su valor a true agrega a los objetos link la propiedad de validation.

    {
        validate : false
    }

##### EJEMPLO DE USO COMO MODULO
```
const mdlinks = require('mdlinks');

mdlink( ['.README'] )
.then(console.log)
```
debería mostrarnos por consola algo como esto:

```
[ { mdText: '[Markdown]',
    link: 'https://es.wikipedia.org/wiki/Markdown',
    line: 5,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md' },
  { mdText: '[Node.js]',
    link: 'https://nodejs.org/',
    line: 16,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md' },
  { mdText: '[md-links]',
    link:
     'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    line: 20,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md' }]
```

si ademas aplicamos la opción validate:

```
const mdlinks = require('mdlinks');

mdlink( ['.README'] , { validate : true} )
.then(console.log)
```

debería mostrarnos algo como lo siguiente:

```
[  { mdText: '[Markdown]',
    link: 'https://es.wikipedia.org/wiki/Markdown',
    line: 5,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md',
    validation: true },
  { mdText: '[Node.js]',
    link: 'https://nodejs.org/',
    line: 16,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md',
    validation: true },
  { mdText: '[md-links]',
    link:
     'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    line: 20,
    file:
     'C:\\Users\\rcana\\Documents\\Laboratoria\\SCL007-md-links\\READMELab.md',
    validation: true } ]
```

### USO EN LA TERMINAL (CLI)

Para usar el modulo en la terminal, y si ha sido instalado de forma global, debemos llamarlo por su nombre `mdlinks`, indicando la ruta del archivo o archivos que queremos analizar y luego las opciones:

```
mdlinks README.md
```
o
```
mdlinks README.md --validate
```
o
```
mdlinks README.md --validate --stats
```

Esto nos mostrará (al igual que en el ejemplo sobre como utilizar md-links como modulo), un arreglo de objetos, cada objeto representando un link con las propiedades: link, file, line y (opcionalmente) validation.

Si agregamos la opción de `--stats`, luego del arreglo de links nos debería mostrar algunas estadísticas sobre la operación realizada: total de links analizados, número de linsk funcionando y número de links rotos. En el siguente formato:

```
Links: 50.
Working: 45.
Broken: 5.
```

### CASOS DE RETORNO DE UN ARRAY VACIO

`md-links` puede retornar una promesa con un resolve de arreglo vacio en los siguientes casos:

- La ruta ingresada no es valida.
- La ruta ingresada no correspondía a un archivo md.
- La ruta ingresada no contenia links en los archivos md analizados.