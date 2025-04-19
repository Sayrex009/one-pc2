"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import OnePc_white from "./../../src/components/icons/One-pc-logo.svg";
import onePcLogo from "../components/icons/One-pc-logo-dark.svg";
import Menubar from "../components/icons/Menu-bar.svg";
import SearchIcon from "../components/icons/Search.svg";
import Taqqoslash from "../components/icons/taqoslash.svg";
import Buy from "../components/icons/Buy.svg";
import Like from "../components/icons/hugeicons_favourite.svg";
import PCyegish from "../components/icons/pc_yegish.svg";
import Phone from "../components/icons/ic_outline-phone.svg";
import Export_img from "../components/icons/iconoir_delivery-truck.svg";
import info from "../components/icons/info.svg";
import boglanish from "../components/icons/Discount.svg";
import button_l from "./../components/icons/button-leave.svg";
import category_icon from "./../components/icons/category-icon.svg";

export default function Navbar() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://pc.onepc.uz/api/v1/product/category/list/",
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Категории:", data); // Проверка данных API
        setCategories(data);
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
        setError("Не удалось загрузить категории. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header>
      {/* Верхняя панель */}
      <div className="bg-[#F5F5F5] hidden min-[950px]:flex">
        <div className="max-w-[1320px] w-full px-5 mx-auto flex items-center justify-between h-[35px]">
          <p className="text-sm text-[#666666]">OnePC ga xush kelibsiz!</p>
          <div className="flex items-center gap-3">
            <Link
              href="tel:+998959041111"
              className="flex items-center gap-2 border-r pr-3"
            >
              <Image src={Phone} alt="phone icon" width={18} height={18} />
              <span className="text-sm text-[#666666]">+998 95 904 11 11</span>
            </Link>
            <Link
              href="/locations"
              className="flex items-center gap-2 border-r pr-3"
            >
              <Image src={Export_img} alt="export_img" width={18} height={18} />
              <span className="text-sm text-[#666666]">
                Bizning manzillarimiz
              </span>
            </Link>
            <button
              onClick={() => {
                const footer = document.getElementById("footer");
                if (footer) {
                  footer.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 border-r pr-3"
            >
              <Image src={boglanish} alt="discount" width={18} height={18} />
              <span className="text-sm text-[#666666]">
                Biz bilan bog‘lanish
              </span>
            </button>
            <button
              className="flex items-center gap-2"
              onClick={() => router.push("/about-us")}
            >
              <Image src={info} alt="info" width={18} height={18} />
              <span className="text-sm text-[#666666]">Biz haqimizda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <div className="bg-white py-3 px-6 flex justify-between items-center max-w-[1320px] mx-auto">
        <Link href="/" className="cursor-pointer">
          <Image
            src={onePcLogo}
            alt="OnePC Logo"
            width={130}
            height={40}
            className="w-full h-auto sm:w-[130px]"
          />
        </Link>

        {/* Поиск */}
        <div className="relative flex flex-wrap items-center md:ml-6 sm:ml-0 sm:w-full sm:justify-between">
          <div className="w-full relative">
            <Image
              src={SearchIcon}
              alt="Search"
              width={20}
              height={20}
              className="absolute sm:w-[12] max-md:w-[20] max-md:h-[20] lg:w-5 lg:h-5 sm:h-[12] left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Qidiruv..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:mr-2 lg:w-[450px] bg-[#D9D9D933] outline-none ring-1 ring-[#EDEDED] focus:ring-mainColor duration-200 h-11 pl-11 pr-4 rounded-[8px]"
            />
            {showResults && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg z-50 max-h-60 overflow-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <Link
                      key={index}
                      href={`/product/${item.id}`}
                      className="block p-2 hover:bg-gray-200"
                    >
                      {item.name_uz}
                    </Link>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">Hech narsa topilmadi</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Иконки навигации */}
        <div className="hidden min-[950px]:flex gap-10 text-sm lg:text-base items-center text-[#666] mr-4">
          {[
            { icon: Taqqoslash, text: "Taqqoslash", link: "/compare" },
            { icon: Buy, text: "Savatcha", link: "/cart" },
            { icon: Like, text: "Sevimlilar", link: "/favorites" },
            { icon: PCyegish, text: "Kompyuter yig‘ish", link: "/setup" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center gap-2 cursor-pointer hover:text-mainColor transition duration-300 whitespace-nowrap"
            >
              <Image src={item.icon} alt={item.text} width={20} height={20} />
              <span className="text-sm">{item.text}</span>
            </Link>
          ))}
        </div>

        {/* Кнопка меню для мобильных устройств */}
        <button
          className="block min-[950px]:hidden ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Image src={Menubar} alt="Menu" width={60} height={60} />
        </button>
      </div>

      {/* Категории */}
      {categories.length > 0 && (
        <div className="hidden lg:flex border-b-2 items-center gap-2 justify-center py-3">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="px-[18px] py-2 bg-gray-100 hover:bg-mainColor rounded-[20px] text-gray-800 text-sm hover:text-white"
            >
              {category.name_uz}
            </Link>
          ))}

          {categories.length > 8 && (
            <div className="relative lg:ml-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-5 py-[6px] bg-gray-100 text-gray-800 rounded-lg hover:bg-mainColor hover:text-white"
              >
                More
              </button>
              {dropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-[200] max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  style={{
                    maxWidth: "calc(100vw - 2rem)",
                    overflowX: "hidden",
                  }}
                >
                  {categories.slice(8).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="block px-2 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {category.name_uz}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="fixed left-0 top-0 h-full w-[80%] max-w-[400px] z-50 bg-white shadow-lg overflow-y-auto">
          <div className="bg-[#071B3B] w-full h-16 flex items-center px-4 justify-between">
            <Image
              src={OnePc_white}
              alt="one-pc logo"
              width={100}
              height={40}
            />
            <button
              className="sm:w-[40px] w-[45px] sm:ml-3"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Image src={button_l} alt="leave-btn" width={40} height={40} />
            </button>
          </div>

          <div className="flex gap-12 items-center text-[#666] border-b px-4 py-2 overflow-x-auto">
            {[
              { icon: Taqqoslash, text: "Taqqoslash", link: "/compare" },
              { icon: Buy, text: "Savatcha", link: "/cart" },
              { icon: Like, text: "Sevimlilar", link: "/favorites" },
              { icon: PCyegish, text: "Kompyuter yig‘ish", link: "/build-pc" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Image src={item.icon} alt={item.text} width={20} height={20} />
                <span className="text-sm">{item.text}</span>
              </Link>
            ))}
          </div>
          <div className="mt-2 flex flex-col">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="flex items-center gap-3 p-3 border-b text-gray-600 hover:text-black relative"
              >
                <span className="text-lg">{category.name_uz}</span>
                <div className="absolute right-4">
                  <Image
                    src={category_icon}
                    alt="category icon"
                    width={16}
                    height={16}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
