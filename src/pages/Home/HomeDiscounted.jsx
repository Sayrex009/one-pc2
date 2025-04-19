"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import Link from "next/link";
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const router = useRouter();
=======
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://pc.onepc.uz/api/v1/product/category/list/"
        );
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status} ${res.statusText}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Ответ сервера не JSON, возможно, ошибка API.");
        }

        const data = await res.json();
        console.log("Категории:", data);

        if (Array.isArray(data)) {
<<<<<<< HEAD
          const BASE_URL = "https://pc.onepc.uz";
=======
          const BASE_URL = "https://pc.onepc.uz"; 
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3

          const formattedCategories = data.map((category) => ({
            ...category,
            icon: category.icon
              ? category.icon.startsWith("http")
                ? category.icon
                : `${BASE_URL}${category.icon}`
              : "/fallback-image.svg",
          }));

          setCategories(formattedCategories);
        } else {
          throw new Error("Неверный формат JSON: " + JSON.stringify(data));
        }
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

<<<<<<< HEAD
  const selectedIds = [48, 54, 6, 66, 7, 2, 75];

=======
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
  if (loading) return <p className="text-center text-gray-500">Yuklanmoqda...</p>;

  return (
    <section className="pb-10 md:pb-20">
      <div className="max-w-[1320px] w-full px-5 mx-auto">
        <div className="flex mb-4 md:mb-[30px]">
          <h1 className="text-[#111111] text-[18px] md:text-[30px] pb-1 pt-5 font-medium md:font-semibold md:border-b-[3px] border-b-[#E2231F]">
            Ommabop kategoriyalar
          </h1>
        </div>
        <div className="flex items-center gap-8 justify-between overflow-x-auto scrollbar-none">
<<<<<<< HEAD
          {categories
            .filter((category) => selectedIds.includes(category.id))
            .map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/categories/${category.id}`)}
                className="min-w-[184px] p-3 md:py-5 h-[56px] md:h-[166px] rounded-lg bg-[#F7F7F7] flex flex-row-reverse md:flex-col justify-between gap-2 items-center md:justify-end"
              >
=======
          {categories.filter((_, index) => [5, 22, 23, 24, 25, 26, 27, 30].includes(index)).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${encodeURIComponent(
                category.name_uz
              )}?query=${category.id}`}
            >
              <button className="min-w-[184px] p-3 md:py-5 h-[56px] md:h-[166px] rounded-lg bg-[#F7F7F7] flex flex-row-reverse md:flex-col justify-between gap-2 items-center md:justify-end">
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
                <div>
                  <Image
                    alt={category.name_uz}
                    src={category.icon}
                    width={80}
                    height={80}
                    className="w-[40px] md:w-[80px]"
                    unoptimized
                  />
                </div>
                <p className="text-[#2D2D2D] text-center text-xs md:text-base">
                  {category.name_uz}
                </p>
              </button>
<<<<<<< HEAD
            ))}
=======
            </Link>
          ))}
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
