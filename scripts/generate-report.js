const path = require("node:path");
const reporter = require("cucumber-html-reporter");

const reportPath = path.join(__dirname, "..", "reports", "cucumber-report.json");
const outputPath = path.join(__dirname, "..", "reports", "cucumber-report.html");

reporter.generate({
  theme: "bootstrap",
  jsonFile: reportPath,
  output: outputPath,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    browser: "chromium",
    platform: process.platform,
    framework: "cucumber-js"
  }
});
