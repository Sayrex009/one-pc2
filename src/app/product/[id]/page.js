"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import Imgnone from "./../../../components/icons/imagenone.png";

export default function ProductPage() {
  const { id } = useParams();
  const safeId = id ? Number(id) : null; // безопасное приведение к числу
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showCheckmark, setShowCheckmark] = useState({
    cart: false,
    buyNow: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch(
          `https://pc.onepc.uz/api/v1/product/product/${safeId}/`
        );
        if (!productRes.ok) throw new Error("Mahsulot topilmadi");
        const productData = await productRes.json();
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik:", error);
        setLoading(false);
      }
    };
    if (safeId) fetchData();
  }, [safeId]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((item) => item.id === safeId));
  }, [safeId]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex === -1) {
      const newItem = {
        id: product.id,
        name_uz: product.name_uz,
        main_image: product.main_image
          ? `https://pc.onepc.uz${product.main_image}`
          : Imgnone.src,
        price: product.price,
        quantity: 1,
      };

      const updatedCart = [...existingCart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...existingCart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    // Показать галочку
    setShowCheckmark({ ...showCheckmark, cart: true });

    // Скрыть галочку через 2 секунды
    setTimeout(() => {
      setShowCheckmark({ ...showCheckmark, cart: false });
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;

    const newItem = {
      id: product.id,
      name_uz: product.name_uz,
      price: product.price,
      main_image: product.main_image
        ? `https://pc.onepc.uz${product.main_image}`
        : Imgnone.src,
      quantity: 1,
    };

    localStorage.setItem("order", JSON.stringify([newItem]));

    // Показать галочку перед переходом
    setShowCheckmark({ ...showCheckmark, buyNow: true });

    // Переход после небольшой задержки, чтобы увидеть галочку
    setTimeout(() => {
      router.push("/order");
    }, 500);
  };

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      favorites = favorites.filter((item) => item.id !== safeId);
    } else {
      favorites.push({
        id: product.id,
        name: product.name_uz,
        price: product.price,
        image: product.main_image
          ? `https://pc.onepc.uz${product.main_image}`
          : Imgnone.src,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <h1 className="text-center text-mainColor text-xl font-semibold mt-10">
        Yuklanmoqda...
      </h1>
    );
  }

  if (!product)
    return (
      <h1 className="text-center text-mainColor text-2xl font-semibold mt-10">
        Mahsulot topilmadi
      </h1>
    );

  return (
    <div className="font-vietnam">
      <Navbar />
      <div className="container mx-auto py-10 px-4 md:px-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex justify-center relative">
            <img
              src={
                product.main_image
                  ? `https://pc.onepc.uz${product.main_image}`
                  : Imgnone.src
              }
              alt={product.name_uz || "Mahsulot"}
              className="w-[320px] md:w-[450px] rounded-lg object-cover"
            />
            <button
              onClick={toggleFavorite}
              className="absolute lg:ml-[70px] top-2 left-2 p-2 rounded-full"
            >
              {isFavorite ? (
                <AiFillHeart size={24} className="text-mainColor" />
              ) : (
                <AiOutlineHeart size={24} className="text-mainColor" />
              )}
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name_uz || "Mahsulot"}
            </h1>

            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Kategoriya:</span>{" "}
              {product.category_name || "Noma'lum"}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand_name || "Noma'lum"}
            </p>

            <p className="text-[#FF0000] text-2xl font-semibold mb-4">
              {product.price
                ? `${product.price.toLocaleString()} UZS`
                : "Narhi korsatilmagan"}
            </p>

            <div className="border-t-[#4b5563] border-b-2 mt-10 mb-10">
              <div className="items-center mb-4">
                <p className="font-semibold mb-4">Rang</p>
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((color, index) => (
                    <div
                      key={color.id || index}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color.rgba_name }}
                    ></div>
                  ))
                ) : (
                  <span className="text-gray-500">Noma'lum</span>
                )}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center border border-gray-300 rounded-[3px]">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 duration-200 text-gray-700"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-white text-center w-12">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 duration-200 text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={addToCart}
                className="bg-[#FF0000] hover:bg-[#DD0405] duration-200 border-2 border-[#FF0000] text-white px-6 py-3 rounded-[3px] w-full flex flex-row items-center justify-center gap-4"
              >
                {showCheckmark.cart ? (
                  <>
                    <FaCheck className="text-white" />
                    <span>Qo'shildi</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    <span>Savatga</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="border-2 border-[#FF0000] px-6 py-2.5 hover:bg-[#FF0000]/5 duration-200 rounded-[3px] text-[#FF0000] w-full col-span-2 flex items-center justify-center gap-2"
              >
                {showCheckmark.buyNow ? (
                  <>
                    <FaCheck className="text-[#FF0000]" />
                    <span>Bajarilmoqda...</span>
                  </>
                ) : (
                  "Xarid qilish"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
