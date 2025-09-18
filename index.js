import express from "express";

const app = express();
app.use(express.json()); // replaces body-parser

function getDeviceNameFromUA(ua = "") {
  const devices = [
		{ name: "iPhone", re: /iphone/i },
		{ name: "OPPO", re: /oppo/i },
		{ name: "Vivo", re: /vivo/i },
		{ name: "Realme", re: /realme/i },
		{ name: "OnePlus", re: /oneplus/i },
		{ name: "Samsung", re: /samsung|sm-/i },
		{ name: "Xiaomi", re: /xiaomi|redmi|mi /i },
		{ name: "Huawei", re: /huawei|honor/i },
		{ name: "Tecno", re: /tecno/i },
		{ name: "Windows Device", re: /windows nt/i },
		{ name: "Mac Device", re: /macintosh|mac os x/i },
		{ name: "Linux Device", re: /linux/i },
	];
  const found = devices.find(d => d.re.test(ua));
  return found ? found.name : "Unknown Device";
}

app.post("/generate", (req, res) => {
  const clientUA = req.body.userAgent || req.headers["user-agent"] || "";
  const clientBattery = req.body.battery || "unknown";

  res.json({
    data: {
      device: getDeviceNameFromUA(clientUA),
      battery: clientBattery
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
