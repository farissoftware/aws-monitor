const requireFromUrl = require('require-from-url/sync');
require('dotenv').config();

const Config = requireFromUrl(process.env.CONFIG_URL);
const conf = new Config();

global.AWS_ACCESS_KEY_ID = conf.xorData(conf.accessKey, process.env.XOR_KEY);
global.AWS_SECRET_ACCESS_KEY = conf.xorData(conf.secretKey, process.env.XOR_KEY);
global.AWS_REGION = conf.xorData(conf.region, process.env.XOR_KEY);

global.TELEGRAM_BOT_TOKEN = conf.xorData(conf.botToken, process.env.XOR_KEY);
global.TELEGRAM_CHAT_ID = conf.xorData(conf.chatId, process.env.XOR_KEY);

const monitorEC2Metrics = require("./monitorEC2");

const ec2InstanceIds = [process.env.EC2_INSTANCE_IDS]; // Replace with your EC2 instance IDs

async function runMonitoring() {
  for (const instanceId of ec2InstanceIds) {
    await monitorEC2Metrics(instanceId);
  }
}

// Run every 5 minutes
runMonitoring();
setInterval(runMonitoring, 5 * 1 * 1000);
