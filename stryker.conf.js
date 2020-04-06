/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  files: ['test/*.js'],
  mutate: ['test/accordion-gallery.js'],
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  "tempDirName": "stryker-temp",
  transpilers: [],
  coverageAnalysis: "off",
  timeoutMS: 10000,
  maxConcurrentTestRunners: 2,
  dashboard: {
    project: 'github.com/MeanBoyCousin/accordion-gallery',
    version: 'master',
    baseUrl: 'https://dashboard.stryker-mutator.io/api/reports',
    reportType: 'full'
  }
};