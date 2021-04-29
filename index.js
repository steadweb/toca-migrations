const process = require('process');
const AWS = require("aws-sdk");
const codebuild = new AWS.CodeBuild({apiVersion: '2016-10-06'});

codebuild.startBuild({ projectName: "bookings-api-dev-toca-social"}, () => {
  process.exit(1);
})
