module.exports = function (config) {
  config.set({
    files: ['test/*.js'],
    mutate: ['test/vertical-gallery.js'],
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    timeoutMS: 10000,
    dashboard: {
      project: 'github.com/MeanBoyCousin/vertical-gallery',
      version: 'master',
      baseUrl: 'https://dashboard.stryker-mutator.io/api/reports',
      reportType: 'full'
    }
  });
};