const process = require('process');
const AWS = require("aws-sdk");
const codebuild = new AWS.CodeBuild({apiVersion: '2016-10-06'});

if(!process.env.JOB_NAME) {
  console.log("JOB_NAME env variable must be set")
  process.exit(1);
}

codebuild.startBuild({ projectName: process.env.JOB_NAME}, async (err, data) => {
  console.log(data);  
  const limit = 30; 
  const timeout = 10000;
  let count = 0;
  do {
    await new Promise(resolve => setTimeout(() => {
      codebuild.batchGetBuilds({ ids: [data.build.id] }, (err, data) => {
        if(err) {
          process.exit(1);
        }

        data.builds.forEach(build => {
          if(build.buildComplete === true) {
            if(build.buildStatus === "SUCCEEDED")
              process.exit(0);
            else
              process.exit(1);
          }
        })
      });

      resolve();
    }, timeout));

    count++;
  } while(count < limit);

  process.exit(1);
});
