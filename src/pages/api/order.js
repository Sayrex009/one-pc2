export default async function handler(req, res) {
    if (req.method !== "POST") {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ 
        success: false,
        message: "Method not allowed" 
      });
    }
  
    try {
      const { 
        first_name, 
        last_name, 
        phone_number, 
        region, 
        city, 
        address, 
        floor, 
        comment, 
        method_for_reception,
        cartItems 
      } = req.body;
  
      // Валидация обязательных полей
      if (!phone_number || !cartItems || cartItems.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Telefon raqam va mahsulotlar majburiy"
        });
      }
  
      const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
      if (!TELEGRAM_BOT_TOKEN || !CHAT_ID) {
        console.error("Telegram credentials missing");
        return res.status(500).json({ 
          success: false,
          message: "Server configuration error" 
        });
      }
  
      // Формируем сообщение для Telegram
      let productsText = cartItems.map((item, index) => 
        `${index + 1}. *${item.name_uz || 'Noma\'lum'}* - ${item.quantity || 1} x ${item.price?.toLocaleString() || '0'} UZS`
      ).join('\n');
  
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1), 
        0
      );
  
      const TEXT = `
  📦 *Yangi buyurtma*
  👤 *Ism:* ${first_name} ${last_name}
  📞 *Tel:* ${phone_number}
  📍 *Manzil:* ${region}, ${city}, ${address}
  🛒 *Mahsulotlar:*
  ${productsText}
  💰 *Jami:* ${totalAmount.toLocaleString()} UZS
  📝 *Izoh:* ${comment || "Yo'q"}
      `;
  
      const telegramResponse = await fetch(
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
  
      // Обрабатываем не-JSON ответы от Telegram API
      const responseText = await telegramResponse.text();
      let result;
      
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Telegram API returned non-JSON response:", responseText);
        throw new Error("Invalid response from Telegram");
      }
  
      if (!telegramResponse.ok) {
        console.error("Telegram API error:", result);
        throw new Error(result.description || "Telegram API error");
      }
  
      return res.status(200).json({ 
        success: true,
        message: "Buyurtma qabul qilindi!" 
      });
  
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ 
        success: false,
        message: error.message || "Internal server error" 
      });
    }
  }