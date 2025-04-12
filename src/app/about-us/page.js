"use client";

import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";
import "@/app/globals.css";
import bg_about from "./../../../public/images/karusel1.jpg";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section>
      <Navbar />
      <div>
        {/* Заголовок */}
        <section className="about-header flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-[28px] md:text-[60px] font-bold mb-3">
            Biz haqimizda
          </h1>
          <p className="max-w-[710px] text-center text-sm md:text-lg text-white">
            OnePc kompaniyasi 2005 yilda Toshkentda boshlangan. Hozirda
            O'zbekistonning kompyuter texnikasi bozorida yetakchi. Biz o'z
            mijozlariga sifatli va yangi yechimlar taklif qilmoqda.
          </p>
        </section>
      </div>

      {/* Основной контент */}
      <section className="py-10 md:py-20">
        <div className="max-w-[1320px] w-full px-5 mx-auto">
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-[#1E242C] text-[28px] md:text-[40px] font-semibold md:font-bold text-center">
              Sifat va innovatsiya
            </h1>
            <p className="text-[#8A8A8A] text-sm md:text-lg max-w-[780px] text-center mb-10 md:mb-[60px]">
              Biz mahsulot va sifat kafolatiga katta e'tibor qaratamiz.
              Zamonaviy texnologiyalarni o'rganib, mijozlarimizning
              ehtiyojlarini qondirish uchun yechimlarni taklif qilamiz.
            </p>
          </div>

          {/* Фоновое изображение */}
          <div className="about_header2 mb-6 md:mb-10">
            <Image 
              src={bg_about} 
              alt="Background about us"
              width={1920}  // Укажите реальную ширину изображения
              height={1080} // Укажите реальную высоту изображения
              className="w-full h-auto"
              priority
            />
          </div>
          
          <div className="lg:pb-12">
            <h2 className="text-xl md:text-[35px] font-semibold mb-[18px] md:mb-[25px]">
              Nima uchun OnePc'ni tanlashim kerak?
            </h2>
            <p className="text-[#1C1D20] text-sm md:text-base">
              OnePc O'zbekiston IT bozorida yetakchi o'rinda. Uning mijozlari
              ishonch bilan qaraydi. Kompaniya sifatli mahsulotlar va xizmatlar
              bilan muvaffaqiyatga erindi. Kelajakda ham mijozlariga zamonaviy
              texnologiyalarni taklif qilishni kuchaytiramiz. Ular uchun eng
              yaxshi yechimlarni topishga harakat qilamiz. OnePc faoliyatini
              rivojlantirishda harakat qilmoqda. Kompaniya iste'molchilar bilan
              hamkorlik qilishga e'tibor qaratmoqda. Innovatsion yechimlarni
              joriy etish va ijtimoiy mas'uliyatni oshirishga alohida e'tibor
              beradi. Biz kelgusida ham mijozlarimizga eng sifatli xizmatlarni
              taqdim etamiz. Ular uchun ishonchni qozonishda davom etamiz.
              OnePcning yutuqlari, sifati va innovatsiyalar kompaniyamiz uchun
              muhimdir.
            </p>
          </div>
          
          {/* Видео блок */}
          <div className="w-full lg:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 items-start gap-10">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="rounded-[20px] lg:rounded-[30px] overflow-hidden">
                  <video
                    className="w-full rounded-[20px] lg:rounded-[30px]"
                    poster="/images/about-bg.jpg"
                    controls
                  >
                    <source src="/video/trailer_hd.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео-тег.
                  </video>
                </div>
                <h2 className="mb-1 md:mb-2 text-[#111D15] font-medium text-lg md:text-[24px] text-center md:text-start">
                  Lorem, ipsum dolor.
                </h2>
                <p className="text-[#666666] text-[12px] md:text-base text-center md:text-start">
                  Lorem ipsum dolor sit amet consectetur. Id purus imperdiet
                  rhoncus sociis pulvinar eu. Sem sit volutpat nisl lorem
                  lacinia faucibus sed vitae.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default AboutUs;