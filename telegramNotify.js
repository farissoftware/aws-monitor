// telegramNotify.js
const https = require("https");


function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${global.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = JSON.stringify({
    chat_id: global.TELEGRAM_CHAT_ID,
    text: message,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  const req = https.request(url, options, (res) => {
    res.on("data", (d) => {});
  });

  req.on("error", (e) => {
    console.error("Telegram Error:", e);
  });

  req.write(payload);
  req.end();
}

module.exports = sendTelegramMessage;
