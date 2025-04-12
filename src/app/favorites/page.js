"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GiScales } from "react-icons/gi";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (product) => {
    const updatedFavorites = favorites.filter((item) => item.id !== product.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name_uz: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">Sevimlilar</h2>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">Sevimlilarda tovar yoq</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-4">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="liked-product group relative p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col overflow-hidden"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                {/* Кнопка "Удалить из избранного" */}
                <div
                  className="absolute top-2 right-2 cursor-pointer z-10 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  <AiFillHeart size={22} />
                </div>
              
                {/* Изображение */}
                <div className="w-full h-40 relative">
                  <Image
                    src={product.image || "/placeholder-image.png"} // Используем product.image вместо product.main_image
                    alt={product.name || "Изображение"}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              
                <div className="mt-4 flex flex-col transition-all duration-300">
                  <h2 className="border-t-2 mt-4 text-sm sm:text-base truncate">
                    {product.name} {/* Используем product.name вместо product.name_uz */}
                  </h2>
              
                  <div className="relative flex items-center justify-between">
                    {/* Цена */}
                    <p
                      className="text-[#0C0C0C] text-sm sm:text-lg pt-1 font-semibold transition-all duration-300 
                      lg:group-hover:-translate-x-10 lg:group-hover:opacity-0"
                    >
                      {product.price?.toLocaleString() || "0"} UZS
                    </p>
              
                    {/* Кнопки (адаптивные) */}
                    <div
                      className="flex gap-[60] transition-all ml-[-108] duration-300 
                      opacity-100 translate-x-0 
                      lg:opacity-0 lg:translate-x-10 lg:group-hover:opacity-100 lg:group-hover:translate-x-0"
                    >
                      <button
                        className="flex items-center gap-2 px-3 py-1 border border-mainColor text-mainColor bg-white rounded-md shadow-md 
                        hover:bg-mainColor hover:text-white transition text-xs sm:text-sm"
                        onClick={(e) => addToCart(product, e)}
                      >
                        <FaShoppingCart size={14} />
                        <span className="hidden sm:inline">Savatga</span>
                      </button>
              
                      <button
                        className="flex items-center justify-center gap-2 px-1 py-1 border text-mainColor border-mainColor rounded-md  
                        hover:bg-mainColor hover:text-white transition text-xs sm:text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GiScales size={18} className="ml-2 mt-2 mb-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}