// monitorEC2Metrics.js
const { GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const cloudWatchClient = require("./awsClient");
const sendTelegramMessage = require("./telegramNotify");

async function getMetric({ namespace, metricName, instanceId, unit = "Percent" }) {
  const command = new GetMetricStatisticsCommand({
    Namespace: namespace,
    MetricName: metricName,
    Dimensions: [{ Name: "InstanceId", Value: instanceId }],
    StartTime: new Date(Date.now() - 5 * 60 * 1000),
    EndTime: new Date(),
    Period: 300,
    Statistics: ["Average"],
    Unit: unit,
  });

  const response = await cloudWatchClient.send(command);
  return response.Datapoints?.[0]?.Average ?? null;
}

async function monitorEC2Metrics(instanceId) {
  const cpu = await getMetric({ namespace: "AWS/EC2", metricName: "CPUUtilization", instanceId });
  const netIn = await getMetric({ namespace: "AWS/EC2", metricName: "NetworkIn", instanceId, unit: "Bytes" });
  const netOut = await getMetric({ namespace: "AWS/EC2", metricName: "NetworkOut", instanceId, unit: "Bytes" });

  // Memory requires CloudWatch Agent
  const memory = await getMetric({
    namespace: "CWAgent",
    metricName: "mem_used_percent",
    instanceId,
  });

  console.log(`📊 EC2 ${instanceId} => CPU: ${cpu}%, Mem: ${memory}%, In: ${netIn}, Out: ${netOut}`);
  sendTelegramMessage(`📊 EC2 ${instanceId} => CPU: ${cpu}%, Mem: ${memory}%, In: ${netIn}, Out: ${netOut}`);
  
  // Simple threshold alert
  if (cpu > 80 || memory > 80) {
    sendTelegramMessage(`🚨 High Usage on EC2 ${instanceId}:\nCPU: ${cpu}%\nMemory: ${memory}%`);
  }
}

module.exports = monitorEC2Metrics;
