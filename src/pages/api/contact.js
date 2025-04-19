export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { name, phone } = req.body;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
    console.log("TOKEN:", TELEGRAM_BOT_TOKEN);
    console.log("CHAT_ID:", CHAT_ID);
  
    if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ message: "Missing Telegram credentials" });
    }
  
    const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
    let providerInfo = "Aniqlanmadi";
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${userIp}`);
      const geoData = await geoResponse.json();
      if (geoData.status === "success") {
        providerInfo = geoData.isp;
      }
    } catch (geoError) {
      console.error("Error fetching ISP info:", geoError);
    }
  
    const TEXT = `
    📩 *Yangi bog‘lanish so‘rovi*  
    👤 *Ism:* ${name}  
    📞 *Telefon:* ${phone}  
    🌐 *IP:* ${userIp}  
    📡 *Provayder:* ${providerInfo}  
    `;
  
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: TEXT,
            parse_mode: "Markdown",
          }),
        }
      );
  
      const result = await response.json();
      console.log("Telegram API response:", result);
  
      if (!response.ok) {
        console.error("Telegram API error:", result);
        throw new Error("Telegram API error");
      }
  
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }