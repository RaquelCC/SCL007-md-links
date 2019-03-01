const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

module.exports = {
  getLinks: userPath => new Promise((resolve, reject) => {
    fs.readFile(path.resolve(path.dirname(require.main.filename), userPath), (err, file) => {
      if (err) return reject(err);
      const linksArray = [];
      const strFile = file.toString().split('\n');
      const link = RegExp("(\\[.*\\])?\\(?(https?://[^\\s`\\)']*)");
      const linkGlobal = RegExp("(\\[.*\\])?\\(?(https?://[^\\s`\\)']*)", 'g');
      for (let i = 0; i < strFile.length; i += 1) {
        // let subStrngs = strFile[i].split(' ');
        const subStrngs = strFile[i].match(linkGlobal);
        // console.log(subStrngs)
        if (link.exec(subStrngs) !== null) {
          for (let j = 0; j < subStrngs.length; j += 1) {
            // console.log(subStrngs[j])
            // console.log(link.exec(subStrngs[j]))
            linksArray.push({
              mdText: link.exec(subStrngs[j])[1] !== undefined ? link.exec(subStrngs[j])[1] : false,
              link: link.exec(subStrngs[j])[2],
              line: i + 1,
              file: path.resolve(path.dirname(require.main.filename), userPath),
            });
          }
        }
      }
      return resolve(linksArray);
      // return resolve(file)
    });
  }),
  validateLink: link => new Promise((resolve) => {
    fetch(link.link)
      .then((data) => {
        if (data.status === 200) {
          return resolve(true);
        }
        // console.log(data.status)
        return resolve(false);
      })
      .catch(err => resolve(false));
  }),
  getFiles: (userPath) => {
    // let filesPaths = [];
    if (fs.statSync(userPath).isDirectory()) {
      return fs.readdirSync(userPath);
    }
  },
  overall: (userPath) => {
    if (fs.statSync(userPath).isFile() && path.extname(userPath) === '.md') {
      // console.log(module.exports.getLinks(userPath))
      return module.exports.getLinks(userPath);
    } if (fs.statSync(userPath).isDirectory()) {
      // let promises = [];
      return Promise.all(module.exports.getFiles(userPath).map(item => module.exports.overall(`${userPath}/${item}`)))
        .then((data) => {
          const links = [];
          // console.log(data.length)
          if (data.length > 0) {
            data.forEach((item) => {
              if (item) {
                item.forEach((subitem) => {
                  links.push(subitem);
                });
              }
            });
          }
          return Promise.resolve(links);
        });
    }
    return Promise.resolve([]);
  },


};
