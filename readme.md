# 📡 Node.js EC2 Monitoring Tool with Telegram Alerts

This lightweight Node.js tool monitors the health and performance of your **AWS EC2 instances** using CloudWatch, and sends **real-time alerts to Telegram** if issues are detected.

---

## ✅ Features

- 🔍 Check EC2 instance health (`StatusCheckFailed`)
- 📊 Monitor EC2 metrics:
  - **CPUUtilization**
  - **Memory Usage** (requires CloudWatch Agent)
  - **NetworkIn** and **NetworkOut**
- 📢 Sends alerts to **Telegram** using a bot
- 🧩 Modular, clean structure (easily extendable)

---

## 📦 Requirements

- Node.js v14+
- AWS credentials (Access Key & Secret Key with CloudWatch permissions)
- Telegram bot token and chat ID
- (Optional) CloudWatch Agent on EC2 for memory metrics

---

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/farissoftware/aws-monitor.git
cd aws-monitor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```dotenv
CONFIG_URL=config-url
XOR_KEY=xor-key
EC2_INSTANCE_IDS=ec2-ids-to-monitor
```

---

## 🚀 Usage
Run the monitoring script:
```bash
node index.js
```

---

## 📁 File Structure
```bash
.
├── awsClient.js             # AWS CloudWatch client setup
├── monitorEC2.js            # Basic EC2 health checks
├── monitorEKS.js     	     # EKS pod status checks
├── telegramNotify.js        # Telegram alert helper
├── index.js                 # Main entry point and scheduler
├── .env                     # (Optional) Environment configuration
```

---

## 🧪 Example Output
```bash
📊 EC2 i-1234567890abcdef0 => CPU: 14%, Mem: 72%, In: 1032, Out: 2048
🚨 High Usage on EC2 i-1234567890abcdef0:
CPU: 91%
Memory: 83%
```

---

## 📝 To Do (Optional)
- Add Kubernetes pod and deployment monitoring
- Save alerts to log file or DB
- Add Slack or email integrations
