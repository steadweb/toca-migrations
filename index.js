const process = require('process');
const AWS = require("aws-sdk");
const codebuild = new AWS.CodeBuild({apiVersion: '2016-10-06'});

codebuild.startBuild({ projectName: "bookings-api-dev-toca-social"}, (err, data) => {
  console.log(data);  
  const limit = 30; // 5 minutes 
  const timeout = 10000; // 10 seconds
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
