"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KaruselBtn1 from './../../components/icons/Group 21.svg';
import KaruselBtn2 from './../../components/icons/Group 22.svg';

export default function Carousel() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://pc.onepc.uz/api/v1/common/advertisement/");
                if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
                
                const data = await response.json();
                const items = Array.isArray(data) ? data : data.results || [];
                
                if (!Array.isArray(items)) throw new Error("Неправильный формат данных от API.");
                
                // Фильтруем слайды без изображений и берем только первый
                const filteredSlides = items.filter(slide => slide.image_uz);
                setSlides(filteredSlides.length > 0 ? [filteredSlides[0]] : []);
            } catch (err) {
                console.error("Ошибка загрузки карусели:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: false, 
        infinite: false, 
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false, 
        arrows: false, 
        fade: true, 
    };

    // Функция обработки клика на слайд
    const handleClick = (slide) => {
        console.log("Кликнули на слайд:", slide);
        // Пример редиректа на другую страницу
        router.push(`/advertisement/${slide.id}`);
    };

    if (loading) return <div className="text-center py-10">Yuklanmoqda...</div>;
    if (error) return <div className="text-center text-red-500 py-10">Ошибка: {error}</div>;
    if (!slides.length) return <div className="text-center py-10">Нет данных для отображения</div>;

    return (
        <div className="relative px-4 mb-2 mt-4">
            <div className="max-w-[1306px] mx-auto">
                {slides.map((slide) => (
                    <div 
                        key={slide.id}
                        onClick={() => handleClick(slide)} // Обработчик клика
                        className="cursor-pointer overflow-hidden rounded-3xl shadow-lg"
                    >
                        <Image
                            src={slide.image_uz.startsWith("http") 
                                ? slide.image_uz 
                                : `https://pc.onepc.uz${slide.image_uz}`}
                            alt={slide.title || "Advertisement"}
                            width={1306}
                            height={360}
                            className="w-full h-[200px] md:h-[360px] object-cover"
                            priority
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
