const process = require('process');
const AWS = require("aws-sdk");
const build = new AWS.CodeBuild({});

build.startJob({ projectName: "bookings-api-dev-toca-social"}, () => {
  process.exit(1);
})
