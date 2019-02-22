const fs = require('fs');
const path = require('path');

module.exports = {
    getLinks: (path)=> {
        return new Promise( (resolve,reject) => {
          fs.readFile(path, (err, file) => {
            if (err) return reject(err);
            const linksArray = [];
            const strFile = file.toString().split('\n');
            const link = RegExp('(https?://.*)\\)')
            // const link = /(https?:\/\/.+\s)/
            // const link = /(https?:\/\/.*)\)\s/;
            for (let i = 0; i<strFile.length; i++) {
                if (link.exec(strFile[i]) !== null) {
                    linksArray.push({
                        "link": link.exec(strFile[i])[1],
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

}