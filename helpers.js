const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')

module.exports = {
    getLinks: (path)=> {
        return new Promise( (resolve,reject) => {
          fs.readFile(path, (err, file) => {
            if (err) return reject(err);
            const linksArray = [];
            const strFile = file.toString().split('\n');
            const link = RegExp('(https?://.*)\\)?')
            for (let i = 0; i<strFile.length; i++) {
                if (link.exec(strFile[i]) !== null) {
                    linksArray.push({
                        "link": link.exec(strFile[i])[1].slice(0,link.exec(strFile[i])[1].indexOf(')') !== -1 ? link.exec(strFile[i])[1].indexOf(')') : link.exec(strFile[i])[1].indexOf(' ')),
                        "line": i+1,
                        "file": path
                    })
                }
            }
            return resolve(linksArray)
            // return resolve(file)
          })
        })
    },
    validateLink: (link) => {
        return new Promise( (resolve,reject) => {
            fetch(link["link"])
                .then(data => {
                    if (data.status === 200) {
                        return resolve(true)
                    } else {
                        return resolve(false)
                    }
                })
                .catch(err => {
                    return resolve(false)
                })
        })
    }

}