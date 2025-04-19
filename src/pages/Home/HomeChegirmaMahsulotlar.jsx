"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DiscountedProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://pc.onepc.uz/api/v1/product/discounted-product/list/");
                if (!res.ok) throw new Error(`Ошибка API: ${res.status}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    const handleProductClick = (productId) => {
        router.push(`/product/${productId}`);
    };

    return (
        <section className="pb-20 md:pb-32 overflow-hidden relative">
            <div className="w-full px-5 mx-auto max-w-[1320px]">
                <h2 className="text-[#111111] text-[18px] md:text-[30px] pb-1 font-medium md:font-semibold">
                    Chegirmadagi mahsulotlar
                </h2>
                <div className="border-b-[3px] border-[#FF0000] w-[370px] mb-6 mt-2"></div>
                {error && <p className="text-center text-[#FF0000]">Hatolik!: {error}</p>}
                
                <div className="relative px-2">
                    <Slider {...settings} className="discounted-products-slider">
                        {products.map((product) => {
                            let imageUrl = product.image_uz || product.image || product.image_url || "";
                            if (imageUrl && !imageUrl.startsWith("http")) {
                                imageUrl = `https://pc.onepc.uz${imageUrl}`;
                            }

                            return (
                                <div key={product.id} className=" outline-none">
                                    <div 
                                        className="cursor-pointer flex flex-col items-center rounded-lg overflow-hidden transition-all duration-300 group"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        <div className="relative overflow-hidden rounded-[20px] h-full w-full ">
                                            <img
                                                src={imageUrl || "/placeholder.jpg"}
                                                alt={product.title || "Product image"}
                                                className="object-contain w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    );
}