const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askProjectDetails: () => {
    const questions = [{
          name: 'projectName',
          type: 'input',
          message: 'Enter the project name',
          validate: (value) => {
            if (value.length) {
              return true
            }

            return 'Enter your project name'
          }
        }, 
        {
        name: 'username',
        type: 'input',
        message: 'Enter your GitHub username or e-mail address:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      },
      
    ];
    return inquirer.prompt(questions);
  },
  askIgnoreFiles: (filelist) => {
    const questions = [{
      type: 'checkbox',
      name: 'ignore',
      message: 'Select the files and/or folders you wish to ignore:',
      choices: filelist,
      default: ['node_modules', 'bower_components']
    }];
    return inquirer.prompt(questions);
  },
}