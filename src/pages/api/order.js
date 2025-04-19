export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: "Faqat POST metodiga ruxsat berilgan"
    });
  }

  try {
    // 1. Получаем данные из запроса
    const { 
      first_name = "",
      last_name = "",
      phone_number,
      cartItems = [],
      ...restData
    } = req.body;

    // 2. Проверка обязательных полей
    if (!phone_number) {
      return res.status(400).json({
        success: false,
        message: "Telefon raqam kiritilishi shart"
      });
    }

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Savat bo'sh"
      });
    }

    // 3. Проверка конфигурации Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram sozlamalari to'liq emas");
    }

    // 4. Функция для экранирования специальных символов в MarkdownV2
    const escapeMarkdown = (text) => {
      return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
    };

    // 5. Формируем текст сообщения с экранированием
    const productsText = cartItems
      .map((item, index) => {
        const name = escapeMarkdown(item.name_uz || item.name || "Noma'lum mahsulot");
        const quantity = item.quantity || 1;
        const price = item.price || 0;
        const total = quantity * price;
        return `${index + 1}\\. ${name} \\- ${quantity} x ${price.toLocaleString()} UZS \\= ${total.toLocaleString()} UZS`;
      })
      .join('\n');

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1), 
      0
    );

    const messageText = `
📦 *Yangi buyurtma* 🚀

👤 *Mijoz:* ${escapeMarkdown(first_name)} ${escapeMarkdown(last_name)}
📞 *Telefon:* ${escapeMarkdown(phone_number)}
📍 *Manzil:* ${escapeMarkdown([restData.region, restData.city, restData.address].filter(Boolean).join(', '))}${restData.floor ? ` \\(${escapeMarkdown(restData.floor)}\\-qavat\\)` : ''}
🚚 *Yetkazish usuli:* ${escapeMarkdown(restData.method_for_reception || "Yetkazib berish")}

🛒 *Mahsulotlar:*
${productsText}

💰 *Jami summa:* ${escapeMarkdown(totalAmount.toLocaleString())} UZS
📝 *Izoh:* ${escapeMarkdown(restData.comment || "Yo'q")}
    `.trim();

    // 6. Отправляем в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: "MarkdownV2"
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      throw new Error(errorData.description || "Telegram xatosi");
    }

    return res.status(200).json({ 
      success: true,
      message: "Buyurtma muvaffaqiyatli qabul qilindi!"
    });

  } catch (error) {
    console.error("Xatolik:", error);
    return res.status(500).json({ 
      success: false,
      message: error.message || "Server xatosi"
    });
  }
}