"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineFilter } from "react-icons/ai";
import { GiScales } from "react-icons/gi";

import icon_leave from "../../../components/icons/category-icon.svg";
import "./../../../styles/category-page.css";
import imgNone from "./../../../components/icons/imagenone.png";

export default function CategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [discount, setDiscount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState({
    cart: null,
    compare: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
      setCompareList(JSON.parse(localStorage.getItem("compare")) || []);
    }
  }, []);
  

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setCompareList(JSON.parse(localStorage.getItem("compare")) || []);
  }, []);

  useEffect(() => {
    fetch("https://pc.onepc.uz/api/v1/product/category/list/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(
      `https://pc.onepc.uz/api/v1/product/category/${id}/?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Ответ от API:", data);
        setProducts(data.results || []);
        setTotalPages(Math.ceil(data.count / (data.page_size || 10 + 10)));
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, [id, currentPage]);

  const toggleFavorite = (product) => {
    let updatedFavorites = favorites.some((item) => item.id === product.id)
      ? favorites.filter((item) => item.id !== product.id)
      : [...favorites, product];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!existingCart.some((item) => item.id === product.id)) {
      const updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name_uz: product.name_uz,
          main_image: product.main_image,
          price: product.price,
        },
      ];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setRecentlyAdded({ ...recentlyAdded, cart: product.id });

      // Reset the checkmark after 2 seconds
      setTimeout(() => {
        setRecentlyAdded((prev) => ({ ...prev, cart: null }));
      }, 2000);
    }
  };

  const addToCompare = (product) => {
    if (!compareList.some((item) => item.id === product.id)) {
      const updatedCompareList = [...compareList, product];
      setCompareList(updatedCompareList);
      localStorage.setItem("compare", JSON.stringify(updatedCompareList));
      setRecentlyAdded({ ...recentlyAdded, compare: product.id });

      // Reset the checkmark after 2 seconds
      setTimeout(() => {
        setRecentlyAdded((prev) => ({ ...prev, compare: null }));
      }, 2000);
    }
  };

  const currentCategory = categories.find(
    (category) => category.id === Number(id)
  );

  const resetFilters = () => {
    setDiscount(false);
    setPriceRange([0, 1000000]);
  };

  const filteredProducts = products.filter((product) => {
    const withinPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const hasDiscount = discount ? product.is_discount > 0 : true;
    return withinPriceRange && hasDiscount;
  });

  return (
    <div>
      <Navbar />
      <div className="ml-[108] max-w-[1320px] w-full px-5 mx-auto flex items-center gap-2 mt-10">
        <a className="text-sm md:text-lg text-[#717171]" href="/">
          Bosh sahifa
        </a>
        <Image src={icon_leave} alt="icon leave" className="w-4 h-4" />
        <span className="text-[#FF0000] text-sm md:text-lg border-b border-[#FF0000]">
          {currentCategory ? currentCategory.name_uz : "Неизвестная категория"}
        </span>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-center my-4 text-center">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 w-[300px] h-[40px] justify-center bg-mainColor text-white rounded-md"
        >
          <AiOutlineFilter size={18} />
          <span>Filter</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar - Hidden on mobile unless toggled */}
        <aside
          className={`bg-white p-4 w-full md:w-64 lg:ml-[-115px] ${
            showMobileFilters ? "block" : "hidden"
          } md:block lg:ml-[-105]`}
        >
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h3 className="text-lg font-semibold">Filter</h3>
            <button onClick={resetFilters} className="text-red-500 text-sm">
              Tozalash
            </button>
          </div>

          {/* Discount Toggle */}
          <div>
            <div className="flex justify-between items-center md:w-72 md:pr-4 md:px-0 py-[14px] border-[#B4B4B4]">
              <h3 className="text-gray-800 font-semibold">Chegirma</h3>
              <label className="relative lg:mr-10 w-16 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all bg-gray-300">
                <input
                  type="checkbox"
                  checked={discount}
                  onChange={() => setDiscount(!discount)}
                  className="sr-only peer"
                />
                <div className="absolute inset-0 w-full h-full bg-gray-300 rounded-full transition-all duration-300 peer-checked:bg-mainColor"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-9"></div>
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4 border-b-2 pb-4">
            <label className="block text-sm text-gray-700 mb-1">Narx:</label>
            <input
              type="range"
              min="0"
              max="1000000000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>{priceRange[1].toLocaleString()} UZS</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm">No filters available.</p>
        </aside>

        <div className="w-full md:w-3/4 cursor-pointer">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:mr-[-120] md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 py-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative p-2 bg-white rounded-lg shadow-md border border-gray-200 
               transition hover:shadow-lg group"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <div
                    className="absolute top-2 right-2 cursor-pointer z-10 text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                  >
                    {favorites.some((item) => item.id === product.id) ? (
                      <AiFillHeart size={22} />
                    ) : (
                      <AiOutlineHeart size={22} />
                    )}
                  </div>

                  <img
                    src={product.main_image ? product.main_image : imgNone.src}
                    alt={product.name_uz}
                    className="w-full h-28 sm:h-36 object-contain"
                  />

                  <h2 className="border-t-2 mt-2 text-xs sm:text-sm truncate">
                    {product.name_uz}
                  </h2>

                  <div className="relative h-10 flex items-center">
                    {/* Price - always visible on mobile */}
                    <p className="text-[#0C0C0C] text-xs sm:text-sm font-semibold lg:group-hover:opacity-0 lg:group-hover:translate-x-[-10px] opacity-100 hidden lg:block">
                      {product.price.toLocaleString()} UZS
                    </p>

                    {/* Mobile price (always visible) */}
                    <p className="text-[#0C0C0C] text-xs sm:text-sm font-semibold lg:hidden">
                      {product.price.toLocaleString()} UZS
                    </p>

                    <div
                      className="absolute right-0 flex gap-1 sm:gap-2 justify-start transition-all duration-300 
                      opacity-100 translate-x-0 lg:opacity-0 lg:translate-x-10 lg:group-hover:opacity-100 lg:group-hover:translate-x-0"
                    >
                      <button
                        className="flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 border border-mainColor rounded-md shadow-md 
                        hover:bg-mainColor hover:text-white transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        {recentlyAdded.cart === product.id ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                          <FaShoppingCart
                            size={14}
                            className="text-mainColor hover:text-white"
                          />
                        )}
                      </button>

                      <button
                        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-mainColor rounded-md  
                        hover:bg-mainColor hover:text-white transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCompare(product);
                        }}
                      >
                        {recentlyAdded.compare === product.id ? (
                          <FaCheck size={14} className="text-white" />
                        ) : (
                          <GiScales
                            size={14}
                            className="text-mainColor hover:text-white"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No product available</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-8">
          <button
            className={`px-4 py-2 text-black font-semibold border border-gray-400 rounded-md transition-all duration-300 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <button
                    key={page}
                    className={`px-4 py-2 font-semibold rounded-md transition-all duration-300 ${
                      currentPage === page
                        ? "bg-mainColor text-white"
                        : "border border-gray-400 bg-white text-black hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }

              if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <span key={page} className="px-4 py-2 text-gray-500">
                    ...
                  </span>
                );
              }

              return null;
            }
          )}

          <button
            className={`px-4 py-2 text-black font-semibold border border-gray-400 rounded-md transition-all duration-300 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage((prev) => Math.min(prev, totalPages))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
