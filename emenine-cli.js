#!/usr/bin/env node

const argv = require('yargs').argv
const meow = require('meow')
const term = require('terminal-kit').terminal
const fs = require('fs')
const homedir = require('os').homedir();
let project = {
  home: homedir,
  source: `${homedir}/.emenine_source`
}
// const [,, ...args] = process.argv

/**
 * Styles
 */

console.log({
  project
})

const terminate = () => {
  term.grabInput(false);
  setTimeout(function () {
    process.exit()
  }, 100);
  term('\n')
}

const directory = (dirName) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
  console.log('dir created')
}

console.log({
  argv
})

if (argv.new) {
  console.log('create new project');
  project.name = argv.new
  directory(project.name)
  console.log({
    project
  });

} else if (argv.update) {
  console.log('update project')
} else if (argv.help) {
  console.log('help')
} else {
  console.log('no options')
  term.colorRgbHex('#ff8800').underline.bgRed.bold('what is the name of your project?').styleReset('\n')
  term.inputField(
    (error, input) => {
      project.name = input
      directory(project.name)
      term('\n')
      process.exit()
    }
  )


}

/**
 * PROJECT INIT
 * 
 * goal: enter new project and format. it will get format from a source directory
 * 0. check for source directory and create it if it is missing
 * 
 * 1. help section what it can build
 * 2. menu of options
 */

term.on('key', function (name, matches, data) {
  if (name === 'CTRL_C') {
    terminate();
  }
});