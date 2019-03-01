#!/usr/bin/env node

const mdLinks = require('./mdlinks');

module.exports = mdLinks;

function getArguments(arr) {
  const filePath = [];
  const optionsArr = [];
  const options = {};
  for (let i = 2; i < arr.length; i += 1) {
    if (arr[i].indexOf('--') !== 0) {
      filePath.push(arr[i]);
    } else {
      optionsArr.push(arr[i]);
    }
  }
  if (optionsArr.indexOf('--validate') !== -1) {
    options.validate = true;
  } else {
    options.validate = false;
  }
  return [filePath, options, optionsArr];
}


if (require.main === module) {
  mdLinks(getArguments(process.argv)[0], getArguments(process.argv)[1])
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((data) => {
      if (getArguments(process.argv)[2].indexOf('--stats') !== -1) {
        console.log((`Links: ${data.length}.`));
        console.log((`Working: ${data.filter((item) => {
          if (item.validation === true) {
            return item;
          }
        }).length}.`));
        console.log((`Broken: ${data.filter((item) => {
          if (item.validation === false) {
            return item;
          }
        }).length}.`));
      }
    });
}
