const fs = require('fs')
const path = require('path')


module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd())
  },

  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory()
    } catch (err) {
      return false
    }
  },
  getDirectories: (source) => {
    console.log({source})

    fs.readdirSync(source, {
        withFileTypes: true
      })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  },
  createDirectory: (dirName) => {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
    console.log('✔ dir created')
  },
  copyFileSync: (source, target) => {
    let targetFile = target

    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source))
      }
    }
    fs.writeFileSync(targetFile, fs.readFileSync(source))
  },

  copyFolderRecursiveSync: (source, target) => {
    let files = []

    //check if folder needs to be created or integrated
    let targetFolder = path.join(target, path.basename(source))
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }

    if (fs.lstatSync(source).isDirectory()) {
      files = fs.readdirSync(source)
      files.forEach(function (file) {
        let curSrcFile = path.join(source, file)
        if (fs.lstatSync(curSrcFile).isDirectory()) {
          copyFolderRecursiveSync(curSrcFile, targetFolder)
        } else {
          copyFileSync(curSrcFile, targetFolder)
        }
      })
    }
  },
  get_project_name: () => {
    console.log('no options')
    term.colorRgbHex('#ff8800').underline.bgRed.bold('what is the name of your project?').styleReset('\n')
    term.inputField(
      (error, input) => {
        if (error) {
          console.log('❗')
        }
        project.name = input
        file.createDirectory(project.name)
        term('\n')
        process.exit()
      }
    )
  },
  new_project: (project_name) => {
    console.log('create new project 🎊 📦 💾 🖥 🧰')
    project.name = project_name
    file.createDirectory(project.name)
    console.log({
      project
    })
  },
  get_template: () => {
    term.cyan('Choose a template:\n')
    term.gridMenu(project.template_list, function (error, response) {
      term('\n').eraseLineAfter.green(
        "#%s selected: %s (%s,%s)\n",
        response.selectedIndex,
        response.selectedText,
        response.x,
        response.y
      )
      process.exit()
    })
  },
  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [{
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:'
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: ['public', 'private'],
        default: 'public'
      }
    ];
    return inquirer.prompt(questions);
  },
}