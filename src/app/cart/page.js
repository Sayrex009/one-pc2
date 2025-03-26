"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import placeholderImage from "./../../components/icons/imagenone.png"; // Добавьте fallback-изображение

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalSum = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const goToOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/order");
  };
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name_uz: product.name_uz, // Убедись, что название передаётся
        price: product.price,
        main_image: product.main_image || placeholderImage, // Фолбэк-изображение
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <p className="text-[#191C1F] text-[20px] md:text-[24px] font-medium mb-5">
          Savatcha
        </p>
        <div className="flex flex-col lg:flex-row lg:items-start gap-[30px] mb-8">
          <div className="w-full lg:w-2/3">
            <div className="w-full h-[38px] bg-[#F2F4F5] flex items-center px-6 border border-[#E4E7E9]">
              <p className="text-xs font-medium text-[#475156] w-[50%]">
                Mahsulotlar
              </p>
              <p className="text-xs font-medium text-[#475156] w-[25%] text-center">
                Mahsulot soni
              </p>
              <p className="text-xs right-4 font-medium text-[#475156] w-[25%] text-right">
                Narxi
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {cart.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Savatcha bo'sh.
                </div>
              ) : (
                cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center py-4 px-6 border-b"
                  >
                    <div className="w-[50%] flex items-center gap-4">
                      <Image
                        src={product.main_image || placeholderImage} // Fallback, если изображение отсутствует
                        alt={product.name_uz || "Product image"} // Обязательный атрибут alt
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                      <p className="text-[#191C1F] text-sm max-w-[220px] line-clamp-2 hover:text-mainColor cursor-pointer duration-150">
                        {product.name_uz}
                      </p>
                    </div>
                    <div className="w-[25%] flex justify-center items-center gap-2">
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold">
                        {product.quantity || 1}
                      </span>
                      <button
                        className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => increaseQuantity(product.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-[25%] flex justify-between items-center">
                      <span className="text-right text-gray-700 font-semibold">
                        {(
                          product.price * (product.quantity || 1)
                        ).toLocaleString()}{" "}
                        UZS
                      </span>
                      <button
                        className="text-mainColor hover:text-red-700 ml-4"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-full lg:w-[37.5%] border border-[#E4E7E9] rounded-[4px] px-6 pt-5 pb-6">
            <h2 className="text-lg font-semibold text-[#191C1F] mb-4">
              Ma'lumotlar
            </h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between text-[#6C7275]">
                <span>Umumiy mahsulot soni</span>
                <span className="text-[#191C1F] font-medium">
                  {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)} ta
                </span>
              </div>

              <div className="flex justify-between text-[#6C7275]">
                <span>Chegirma</span>
                <span className="text-[#191C1F] font-medium">0 UZS</span>
              </div>

              <div className="flex justify-between text-[#6C7275]">
                <span>Yetkazib berish</span>
                <span className="text-[#191C1F] font-medium">Bepul</span>
              </div>
            </div>

            <hr className="my-4 border-[#E4E7E9]" />

            <div className="flex justify-between text-base font-semibold">
              <span>Umumiy summa</span>
              <span className="text-[#191C1F]">
                {totalSum.toLocaleString()} UZS
              </span>
            </div>

            <button
              onClick={goToOrder}
              className="w-full mt-5 bg-mainColor text-white py-3 rounded-[2px] text-base font-semibold flex justify-center items-center gap-2 hover:bg-red-600"
            >
              RASMIYLASHTIRISH <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
