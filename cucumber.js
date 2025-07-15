module.exports = {
    default: {
      publishQuiet: true,  // This replaces --publish-quiet
      format: ['progress-bar', 'html:reports/cucumber-report.html'],
      require: [
        'feature/step-definitions/**/*.ts',
        'support/**/*.ts'
      ],
      requireModule: ['ts-node/register']
    }
  }