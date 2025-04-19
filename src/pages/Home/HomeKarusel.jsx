"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageEror from "./../../components/icons/imagenone.png";

import LeftArrow from "./../../components/icons/Group 21.svg";
import RightArrow from "./../../components/icons/Group 22.svg";

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const videoRefs = useRef([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pc.onepc.uz/api/v1/common/advertisement/"
        );
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.results || [];

        const filteredSlides = items.map((slide) => ({
          ...slide,
          hasVideo:
            slide.video_uz &&
            (slide.video_uz.endsWith(".mp4") ||
              slide.video_uz.endsWith(".webm")),
        }));

        setSlides(filteredSlides);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlay = () => {
    if (sliderRef.current && videoRefs.current.length > 0) {
      const currentSlide = sliderRef.current.innerSlider.state.currentSlide;
      const video = videoRefs.current[currentSlide];
      if (video && slides[currentSlide]?.hasVideo) {
        video.play().catch((e) => console.log("Autoplay prevented:", e));
      }
    }
  };

  useEffect(() => {
    handlePlay();
    const interval = setInterval(handlePlay, 1000);
    return () => clearInterval(interval);
  }, [slides]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    afterChange: (current) => {
      if (videoRefs.current[current] && slides[current]?.hasVideo) {
        videoRefs.current[current]
          .play()
          .catch((e) => console.log("Autoplay prevented:", e));
      }
    },
  };

  const handleSlideClick = () => router.push("/categories/66");

  const handleVideoReady = (index) => {
    if (sliderRef.current?.innerSlider.state.currentSlide === index) {
      videoRefs.current[index]
        ?.play()
        .catch((e) => console.log("Autoplay prevented:", e));
    }
  };

  if (loading) return <div className="text-center py-10">Yuklanmoqda...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">Xato: {error}</div>;
  if (!slides.length)
    return <div className="text-center py-10">Ma'lumotlar mavjud emas</div>;

  return (
    <div className="relative px-4 mb-2 mt-4">
      <div className="max-w-[1306px] mx-auto relative">
        <Slider {...settings} ref={sliderRef}>
          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              onClick={handleSlideClick}
              className="cursor-pointer overflow-hidden rounded-3xl relative"
            >
              {slide.hasVideo ? (
                <>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={
                      slide.video_uz.startsWith("http")
                        ? slide.video_uz
                        : `https://pc.onepc.uz${slide.video_uz}`
                    }
                    muted
                    loop
                    playsInline
                    onCanPlay={() => handleVideoReady(index)}
                    className="w-full h-[200px] md:h-[360px] object-cover"
                    poster={
                      slide.image_uz
                        ? slide.image_uz.startsWith("http")
                          ? slide.image_uz
                          : `https://pc.onepc.uz${slide.image_uz}`
                        : undefined
                    }
                  />
                </>
              ) : (
                <FallbackImage
                  src={
                    slide.image_uz.startsWith("http")
                      ? slide.image_uz
                      : `https://pc.onepc.uz${slide.image_uz}`
                  }
                  alt={slide.title || "Reklama"}
                  index={index}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

function FallbackImage({ src, alt, index }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <Image
      src={imgErr ? ImageEror : src}
      alt={alt}
      width={1306}
      height={360}
      className="w-full h-[200px] md:h-[360px] object-cover"
      onError={() => setImgErr(true)}
      priority={index === 0}
    />
  );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute z-20 left-4 top-1/2 -translate-y-1/2 cursor-pointer`}
        onClick={onClick}
        style={{ width: "auto", height: "auto" }}
      >
        <Image
          src={LeftArrow}
          alt="Prev"
          width={70}
          height={70}
          className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] object-contain"
          priority
        />
      </div>
    );
  }
  
  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} absolute z-20 right-4 top-1/2 -translate-y-1/2 cursor-pointer`}
        onClick={onClick}
        style={{ width: "auto", height: "auto" }}
      >
        <Image
          src={RightArrow}
          alt="Next"
          width={70}
          height={70}
          className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] object-contain"
          priority
        />
      </div>
    );
  }
  
  