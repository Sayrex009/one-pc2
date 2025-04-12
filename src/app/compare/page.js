"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import Link from "next/link";
import button_l from "./../../components/icons/button-leave.svg";
import imgNone from './../../components/icons/imagenone.png';

export default function ComparePage() {
  const router = useRouter();
  const [compareList, setCompareList] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCompareList = JSON.parse(localStorage.getItem("compare")) || [];
    setCompareList(savedCompareList);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://pc.onepc.uz/api/v1/product/category/list/"
        );
        if (response.ok) {
          const data = await response.json();
          const categoryMap = data.reduce((acc, category) => {
            acc[category.id] = category.name_uz;
            return acc;
          }, {});
          setCategories(categoryMap);
        }
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (compareList.length === 0) return;

      setLoading(true);
      const newDetails = {};

      try {
        await Promise.all(
          compareList.map(async (product) => {
            const response = await fetch(
              `https://pc.onepc.uz/api/v1/product/product/${product.id}/`
            );
            if (response.ok) {
              const data = await response.json();
              newDetails[product.id] = data;
            }
          })
        );
        setProductDetails(newDetails);
      } catch (error) {
        console.error("Ошибка загрузки характеристик:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [compareList]);

  const removeFromCompare = (productId) => {
    const updatedList = compareList.filter((item) => item.id !== productId);
    setCompareList(updatedList);
    localStorage.setItem("compare", JSON.stringify(updatedList));

    setProductDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      delete updatedDetails[productId];
      return updatedDetails;
    });
  };

  const clearCompareList = () => {
    setCompareList([]);
    setProductDetails({});
    localStorage.removeItem("compare");
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <p className="text-gray-500 mb-4">Taqoslanayotgan maxsulotlar yo‘q</p>
            <Link
              href="/"
              className="text-[#fff] text-sm font-bold mt-6 w-[300px] sm:w-[350px] rounded-[2px] bg-mainColor hover:bg-[#DD0405] duration-200 flex items-center h-12 justify-center gap-2"
            >
              Taqoslashni boshlang
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={clearCompareList}
                className="px-4 py-2 bg-mainColor text-white rounded hover:bg-red-600 transition"
              >
                O'chirish
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-4">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="liked-product relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <div
                    className="absolute top-2 right-2 cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCompare(product.id);
                    }}
                  >
                    <Image src={button_l} alt="icon leave" className="w-4 h-4" />
                  </div>

                  <img
                    src={product.main_image ? product.main_image : imgNone.src}
                    alt={product.name_uz}
                    className="w-full h-40 object-contain"
                  />

                  <h2 className="border-t-2 mt-4 text-sm sm:text-base">
                    {product.name_uz}
                  </h2>
                  <p className="liked-product-price text-[#0C0C0C] text-sm sm:text-lg pt-1">
                    {product.price.toLocaleString()} UZS
                  </p>

                  <div className="hidden sm:flex absolute bottom-3 right-3 gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      className="flex items-center mt-4 justify-center w-24 sm:w-32 h-9 border border-red-500 text-red-500 bg-white rounded-lg shadow-md hover:bg-red-500 hover:text-white transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🛒
                    </button>

                    <button
                      className="flex mt-3 items-center justify-center w-10 h-10 border border-red-500 text-red-500 bg-white rounded-lg shadow-md hover:bg-red-500 hover:text-white transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ⚖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
