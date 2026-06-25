module.exports = {
  default: [
    "features/**/*.feature",
    "--require support/**/*.js",
    "--require step-definitions/**/*.js",
    "--format progress",
    "--format json:reports/cucumber-report.json"
  ].join(" ")
};
