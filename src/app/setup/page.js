"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import iconLeave from "../../components/icons/category-icon.svg";
import Imagenone from "../../components/icons/imagenone.png";

export default function SetupPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Получение списка категорий
  useEffect(() => {
    fetch("https://pc.onepc.uz/api/v1/product/category/list/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  // Получение товаров по категории с пагинацией
  // Получение товаров по категории с пагинацией
  useEffect(() => {
    if (activeCategory === null) return; // Проверяем, выбрана ли категория

    fetch(
      `https://pc.onepc.uz/api/v1/product/category/${activeCategory}/?page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results || []);
        setTotalPages(Math.ceil(data.count / (data.page_size || 10)));
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, [activeCategory, currentPage]); // Список зависимостей всегда одинаковый

  // Получение выбранных товаров из localStorage
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setSelectedProducts(storedProducts);
  }, []);

  // Выбор категории
  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  // Добавление / удаление товаров
  const toggleProduct = (product) => {
    setSelectedProducts((prev) => {
      let newProducts;
      if (prev.some((item) => item.id === product.id)) {
        newProducts = prev.filter((item) => item.id !== product.id);
      } else {
        newProducts = [...prev, product];
      }
      localStorage.setItem("selectedProducts", JSON.stringify(newProducts));
      return newProducts;
    });
  };

  // Оформление заказа
  const handleOrder = () => {
    localStorage.setItem("order", JSON.stringify(selectedProducts));
    window.location.href = "/order";
  };

  // Подсчет общей стоимости
  const totalPrice = selectedProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div>
      <Navbar />

      <div className="ml-28 max-w-[1320px] w-full px-5 mx-auto flex items-center gap-2 mt-10">
        <a className="text-sm md:text-lg text-gray-600" href="/">
          Bosh sahifa
        </a>
        <Image src={iconLeave} alt="icon leave" className="w-4 h-4" />
        <span className="text-red-600 text-sm md:text-lg border-b border-red-600">
          Kompyuter yig'ish
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Боковое меню с категориями */}
        <aside className="w-full md:w-1/4 bg-white p-4 xl:ml-[-100] shadow-md rounded-lg max-h-[500px] overflow-y-auto custom-scrollbar">
          <h3 className="text-lg font-semibold mb-4 text-left">
            Kategoriyalar
          </h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="mb-2">
                <button
                  onClick={() => selectCategory(category.id)}
                  className={`block w-full text-left p-2 rounded-lg transition-all ${
                    activeCategory === category.id
                      ? "bg-mainColor text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {category.name_uz}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Основной контент */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className={`relative p-4 bg-white rounded-xl shadow-lg border cursor-pointer transition transform hover:scale-105 ${
                    selectedProducts.some((item) => item.id === product.id)
                      ? "border-red-600 shadow-xl"
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => toggleProduct(product)}
                >
                  <Image
                    src={
                      product.main_image ? product.main_image : Imagenone.src
                    }
                    alt={product.name_uz}
                    width={150}
                    height={150}
                    className="w-full h-40 object-contain rounded-lg"
                  />
                  <h2 className="mt-2 text-sm font-semibold text-gray-800 truncate">
                    {product.name_uz}
                  </h2>
                  <p className="text-red-600 text-lg font-semibold">
                    {product.price.toLocaleString()} UZS
                  </p>
                  {/* Чекбокс выбора */}
                  <div className="absolute top-3 right-3 w-5 h-5 border border-red-600 bg-white flex items-center justify-center rounded-sm">
                    {selectedProducts.some(
                      (item) => item.id === product.id
                    ) && <div className="w-3 h-3 bg-red-600 rounded-sm"></div>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">
                Mahsulotlar topilmadi
              </p>
            )}
          </div>
        </div>

        {/* Корзина */}
        <div className="w-full md:w-[300px] lg:w-[340px] xl:w-[500px] xl:mr-[-100] bg-white border border-[#E4E7E9] rounded-lg px-6 pt-5 pb-4 shadow-md self-start">
          <h3 className="text-lg text-[#191C1F] mb-5 font-semibold">
            Ma'lumotlar
          </h3>
          <div className="space-y-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 border-b pb-2"
              >
                <Image
                  src={product.main_image || Imagenone.src}
                  alt={product.name_uz}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm  truncate w-40 text-overflow: ellipsis">
                    {product.name_uz}
                  </p>
                  <p className="text-mainColor text-sm font-semibold">
                    {product.price.toLocaleString()} UZS
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <p className="text-sm text-gray-700">
            Umumiy mahsulotlar soni:{" "}
            <strong>{selectedProducts.length} ta</strong>
          </p>
          <p className="text-sm text-gray-700">
            Chegirma: <strong>0 UZS</strong>
          </p>
          <p className="text-sm text-gray-700">
            Yetkazib berish: <strong>Bepul</strong>
          </p>
          <p className="text-xl font-semibold mt-4">
            Umumiy summa: {totalPrice.toLocaleString()} UZS
          </p>
          <button
            onClick={handleOrder}
            className="w-full mt-4 bg-mainColor text-white p-3 rounded-[3] font-bold hover:bg-red-600 transition"
          >
            RASMILASHTIRISH →
          </button>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            &lt;
          </button>
          <span className="px-4 py-2 border rounded-lg bg-red-600 text-white">
            {currentPage}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            &gt;
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
