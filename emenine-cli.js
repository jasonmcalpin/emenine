#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const fs = require('fs')
const path = require('path')

const files = require('./lib/files')
const repo = require('./lib/repo')
const inquirer = require('./lib/inquirer')
const github = require('./lib/github')
const templates = require('./lib/templates')

const { homedir } = require('os')

const Configstore = require('emenine')
const conf = new Configstore('projectinit')

let project = {
  os: process.platform,
  home: homedir,
  source: `${homedir}/.emenine_source`,
  templates: `${homedir}/.emenine_source/templates`,
}

if (project.os === 'win32') {
  project.source = `${homedir}\\.emenine_source`
  project.templates = `${homedir}\\.emenine_source\\templates`
}

project.template_list = files.getDirectories(`${project.templates}`)

clear()

console.log(chalk.yellow(figlet.textSync('EMENINE', { horizontalLayout: 'full' })))

if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a git repository!'))
  process.exit()
}

const getGithubToken = async () => {
  let token = github.getStoredGithubToken()
  if (token) {
    return token
  }

  await github.setGithubCredentials()

  const accessToken = await github.hasAccessToken()
  if (accessToken) {
    console.log(chalk.yellow('An existing access token has been found!'))
    token = await github.regenerateNewToken(accessToken.id)
    return token
  }

  token = await github.registerNewToken()
  return token
}


const run = async () => {
  try {
    const token = await getGithubToken()
    github.githubAuth(token)

    const url = await repo.createRemoteRepo()

    await repo.createGitignore()

    const done = await repo.setupRepo(url)
    if (done) {
      console.log(chalk.green('All done!'))
    }
  } catch (err) {
    if (err) {
      switch (err.code) {
        case 401:
          console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'))
          break
        case 422:
          console.log(chalk.red('There already exists a remote repository with the same name'))
          break
        default:
          console.log(err)
      }
    }
  }
}

run()

console.log({
  project
})



// const terminate = () => {
//   term.grabInput(false)
//   setTimeout(function () {
//     process.exit()
//   }, 100)
//   term('\n')
// }
// term.on('key', function (name, matches, data) {
//   if (name === 'CTRL_C') {
//     terminate()
//   }
// })






// const init_source = (source_path = '') => {
//   let destination = source_path == '' ? project.home : source_path

//   copyFolderRecursiveSync(`${__dirname}/.emenine_source`, destination)
// }



// init_source()








/**
 * PROJECT INIT
 * 
 * goal: enter new project and format. it will get format from a source directory
 * 
 * 0. check for source directory and create it if it's missing. add default templates
 * 
 * 1. --help section what it can build
 * 2. --new create folder and name it this. show templates
 * 3. --update add a feature to existing project. show additions
 * 
 * 
 * 
 */