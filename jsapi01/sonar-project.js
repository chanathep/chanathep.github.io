const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner.default({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.projectKey': 'jsapi01',
    'sonar.projectName': 'jsapi01',
    'sonar.sources': '.',
    'sonar.tests': '.',
    'sonar.inclusions': '**/*.js',
    'sonar.test.inclusions': '**/*.test.js',
    'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    'sonar.testExecutionReportPaths': 'test-report.xml'
  }
}, () => {});