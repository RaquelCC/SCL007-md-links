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
            const link = RegExp("(https?://[^\\s`)']*)")
            for (let i = 0; i<strFile.length; i++) {
                let subStrngs = strFile[i].split(' ');
                for (let j = 0; j<subStrngs.length; j++)
                if (link.exec(subStrngs[j]) !== null) {
                    // console.log(link.exec(subStrngs[j]))
                    linksArray.push({
                        "link": link.exec(subStrngs[j])[1],
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
                        // console.log(data.status)
                        return resolve(false)
                    }
                })
                .catch(err => {
                    return resolve(false)
                })
        })
    },
    getFiles: (userPath) => {
        let filesPaths = [];
        if (fs.statSync(userPath).isDirectory()) {
            filesPaths.push(fs.readdirSync(userPath))
        }
        return filesPaths
    },
    overall: (userPath) => {
        if (fs.statSync(userPath).isFile() && path.extname(userPath) === '.md') {
            // console.log(module.exports.getLinks(userPath))
            return module.exports.getLinks(userPath);
        } else if (fs.statSync(userPath).isDirectory()) {
        // let promises = [];
        return Promise.all(module.exports.getFiles(userPath)[0].map(item => module.exports.overall(userPath+"/"+item)))
        } else {
            return
        }
    }

}