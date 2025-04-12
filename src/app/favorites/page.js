"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { GiScales } from "react-icons/gi";
import Imagenone from "../../components/icons/imagenone.png";

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
      } catch (error) {
        console.error("Error parsing favorites:", error);
        setFavorites([]);
      }
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
        name: product.name || product.name_uz || "Nomsiz mahsulot",
        price: product.price,
        image: product.main_image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-4xl lg:mr-[540px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <h2 className="text-2xl font-semibold mb-6">Sevimlilar</h2>
          
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Sevimlilarda tovar yo'q</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {favorites.map((product) => {
                const productName = product.name || product.name_uz || "Nomsiz mahsulot";
                const imageUrl = product.main_image 
                  ? `https://pc.onepc.uz${product.main_image}`
                  : Imagenone.src || Imagenone;

                return (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col h-full cursor-pointer"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <button
                      className="absolute top-2 right-2 z-10 text-red-500 hover:scale-110 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                      aria-label="Remove from favorites"
                    >
                      <AiFillHeart size={22} />
                    </button>

                    <div className="w-full aspect-square relative p-4 bg-gray-50">
                      <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-contain"
                        unoptimized
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = Imagenone.src || Imagenone;
                        }}
                      />
                    </div>

                    <div className="p-4 pt-0 flex flex-col flex-grow">
                      <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[40px]">
                        {productName}
                      </h3>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[#0C0C0C] font-semibold text-sm truncate">
                            {product.price?.toLocaleString() || "0"} UZS
                          </p>

                          <div className="flex gap-1 sm:opacity-0 sm:translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-200">
                            <button
                              className="p-2 bg-white border border-mainColor text-mainColor rounded-md hover:bg-mainColor hover:text-white transition"
                              onClick={(e) => addToCart(product, e)}
                              aria-label="Savatchaga qo'shish"
                            >
                              <FaShoppingCart size={14} />
                            </button>
                            <button
                              className="p-2 bg-white border border-mainColor text-mainColor rounded-md hover:bg-mainColor hover:text-white transition"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Taqqoslash"
                            >
                              <GiScales size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}