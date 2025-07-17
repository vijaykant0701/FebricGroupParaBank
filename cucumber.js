module.exports = {
    default: {
      paths: ['features/ui'],
      require: [
        'features/step-definitions/ui/*.ts',
        'support/*.ts'
      ],
      requireModule: ['ts-node/register'],
      worldParameters: {},
      format: ['progress', 'json:reports/cucumber-report.json']
    }
  }