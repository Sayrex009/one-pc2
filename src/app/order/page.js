"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import icon_leave from "../../components/icons/category-icon.svg";
import Imagenone from "../../components/icons/imagenone.png";

export default function OrderPage() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    region: "",
    city: "",
    address: "",
    floor: "",
    comment: "",
    method_for_reception: "Yetkazib berish",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    // Загружаем данные из localStorage
    const loadCartData = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const order = JSON.parse(localStorage.getItem("order") || "[]");
        const mergedItems = [...cart, ...order].reduce((acc, item) => {
          const existing = acc.find(i => i.id === item.id);
          if (existing) {
            existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
          } else {
            acc.push({ ...item, quantity: item.quantity || 1 });
          }
          return acc;
        }, []);
        setCartItems(mergedItems);
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    };

    loadCartData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Валидация формы
    if (!formData.phone_number) {
      setSubmitError("Telefon raqam kiritilishi shart");
      setIsSubmitting(false);
      return;
    }

    if (cartItems.length === 0) {
      setSubmitError("Savat bo'sh");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cartItems,
        }),
      });

      // Обработка ответа
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Buyurtma yuborishda xatolik");
      }

      // Успешная отправка
      localStorage.removeItem("cart");
      localStorage.removeItem("order");
      setCartItems([]);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error.message || "Internet aloqasida muammo. Iltimos, qayta urunib ko'ring."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-vietnam">
      <Navbar />
      
      {/* Хлебные крошки */}
      <div className="max-w-[1320px] w-full px-5 mx-auto flex items-center gap-2 mt-5 md:mt-10">
        <a className="text-sm md:text-lg text-[#717171]" href="/">
          Bosh sahifa
        </a>
        <Image src={icon_leave} alt="icon leave" width={16} height={16} />
        <span className="text-[#FF0000] text-sm md:text-lg border-b border-[#FF0000]">
          Buyurtma berish
        </span>
      </div>

      {/* Основной контент */}
      <form onSubmit={handleSubmit} className="container mx-auto py-6 px-4 md:px-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Левая колонка - форма */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-4">Buyurtma berish</h2>
            
            {/* Сообщения об ошибках/успехе */}
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Buyurtmangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.
              </div>
            )}

            {/* Поля формы */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['first_name', 'last_name', 'phone_number', 'region', 'city', 'address', 'floor'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm text-gray-700 font-medium capitalize mb-1">
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type={field === 'phone_number' ? 'tel' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required={field === 'phone_number'}
                  />
                </div>
              ))}

              {/* Метод получения */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qabul qilish usuli
                </label>
                <select
                  name="method_for_reception"
                  value={formData.method_for_reception}
                  onChange={(e) => setFormData({...formData, method_for_reception: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="Yetkazib berish">Yetkazib berish</option>
                  <option value="Olib ketish">Olib ketish</option>
                </select>
              </div>
            </div>

            {/* Комментарий */}
            <div className="mt-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Kur'yer uchun izoh
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={3}
              />
            </div>
          </div>

          {/* Правая колонка - корзина */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Ma'lumotlar</h3>
            
            {/* Список товаров */}
            <div className="max-h-[250px] overflow-y-auto mb-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-3 border-b">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.main_image || Imagenone.src}
                        alt={item.name_uz || "Mahsulot"}
                        width={60}
                        height={60}
                        className="w-12 h-12 object-contain rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.name_uz || "Noma'lum mahsulot"}
                      </p>
                      <p className="text-red-600 font-semibold mt-1">
                        {item.price?.toLocaleString() || '0'} UZS × {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 py-4">Savat bo'sh</p>
              )}
            </div>

            {/* Итоговая информация */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Mahsulotlar soni:</span>
                <span className="font-medium">{cartItems.length} ta</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Yetkazib berish:</span>
                <span className="font-medium">Bepul</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4">
                <span>Jami:</span>
                <span className="text-red-600">
                  {cartItems
                    .reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
                    .toLocaleString()} UZS
                </span>
              </div>
            </div>

            {/* Кнопка отправки */}
            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full mt-6 py-3 rounded-md font-bold text-white ${
                isSubmitting || cartItems.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } transition-colors`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Yuborilmoqda...
                </span>
              ) : (
                "Buyurtma berish"
              )}
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}