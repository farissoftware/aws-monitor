// monitorEKS.js
const { GetMetricStatisticsCommand } = require("@aws-sdk/client-cloudwatch");
const cloudWatchClient = require("./awsClient");
const sendTelegramMessage = require("./telegramNotify");

/**
 * Monitor EKS pod status.
 * You can extend this to monitor specific namespaces, deployments, etc.
 * 
 * Metric examples from Container Insights:
 * - kubernetes.pod.status.failed
 * - kubernetes.pod.status.pending
 */
async function monitorEKS(podName, namespace) {
  const metricName = "pod_status_failed"; // Example metric name (replace with actual CloudWatch metric)
  const dimensions = [
    { Name: "PodName", Value: podName },
    { Name: "Namespace", Value: namespace }
  ];

  const command = new GetMetricStatisticsCommand({
    Namespace: "ContainerInsights", // Replace with your actual namespace if different
    MetricName: metricName,
    Dimensions: dimensions,
    StartTime: new Date(Date.now() - 5 * 60 * 1000),
    EndTime: new Date(),
    Period: 300,
    Statistics: ["Maximum"],
  });

  try {
    const response = await cloudWatchClient.send(command);
    const datapoints = response.Datapoints || [];

    const failed = datapoints.some((dp) => dp.Maximum > 0);
    if (failed) {
      console.log(`🚨 Pod ${podName} in namespace ${namespace} has failed status.`);
      sendTelegramMessage(`🚨 Pod ${podName} in namespace ${namespace} has failed status!`);
    } else {
      console.log(`✅ Pod ${podName} in namespace ${namespace} is healthy.`);
      sendTelegramMessage(`✅ Pod ${podName} in namespace ${namespace} is healthy.`);
    }
  } catch (err) {
    console.error("Error fetching pod metrics:", err);
  }
}

module.exports = monitorEKS;
