"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DiscountedProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://pc.onepc.uz/api/v1/product/product/top/list/");
                if (!res.ok) throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
                
                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("Ошибка API: данные не в массиве");
                }

                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="pb-10 md:pb-20">
            <div className="max-w-[1320px] w-full px-5 mx-auto">
                <div className="flex justify-between items-center mb-5 mt-20 md:mb-[30px]">
                    <h1 className="text-[#111] text-[18px] md:text-[30px] font-semibold border-b-[3px] border-b-[#E2231F]">
                        Topdagi mahsulotlar
                    </h1>
                </div>
                
                {error && <p className="text-center text-red-500">Hatolik!: {error}</p>}
                {loading && <p className="text-center text-gray-500">Yuklanmoqda...</p>}
                
                <div className="flex items-center gap-9 overflow-x-auto scrollbar-none">
                    {!loading && products.map((product) => {
                        let imageUrl = product.main_image ? decodeURIComponent(product.main_image) : "/placeholder.jpg";
                        if (imageUrl && !imageUrl.startsWith("http")) {
                            imageUrl = `https://pc.onepc.uz${imageUrl}`;
                        }
                        return (
                            <div 
                                key={product.id} 
                                className="min-w-[170px] md:min-w-[227px] max-w-[170px] md:max-w-[227px] h-[220px] md:h-[310px] 
                                           rounded-[16px] border border-[#EDEDED] hover:border-[#E2231F] hover:shadow-lg 
                                           transition duration-150 overflow-hidden"
                            >
                                <div className="h-[65%] bg-[#F5F5F5] p-1.5 md:p-3">
                                    <a className="flex items-center justify-center h-full" href={`/product/${product.id}`}>
                                        <Image 
                                            src={imageUrl} 
                                            alt={product.name_uz || "Mahsulot"} 
                                            width={300} 
                                            height={300} 
                                            className="h-full w-full object-cover rounded-lg"
                                            unoptimized
                                        />
                                    </a>
                                </div>
                                <div className="h-[35%] p-2 md:p-3 text-center">
                                    <a className="text-[#222] text-sm md:text-base font-medium line-clamp-1" href={`/product/${product.id}`}>
                                        {product.name_uz || "No Name"}
                                    </a>
                                    <p className="text-[#6F6F6F] text-sm md:text-base line-clamp-1 md:border-b border-b-[#EDEDED] md:pb-1.5 md:mb-1.5">
                                        {product.price ? `${product.price.toLocaleString()} UZS` : "Narhi korsatilmagan"}
                                    </p>
                                    <a className="text-[#E2231F] border-b border-b-[#E2231F] leading-4" href={`/product/${product.id}`}>
                                        Batafsil
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}