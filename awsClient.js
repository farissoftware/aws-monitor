// awsClient.js
const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");

const cloudWatchClient = new CloudWatchClient({
  region: global.AWS_REGION,
  credentials: {
    accessKeyId: global.AWS_ACCESS_KEY_ID,
    secretAccessKey: global.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = cloudWatchClient;
