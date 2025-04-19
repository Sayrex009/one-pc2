import Image from "next/image";
import OnePc from "./../../src/components/icons/One-pc-logo.svg";
import facebook from "./../components/icons/bi_facebook.svg";
import telegram from "./../components/icons/mingcute_telegram-fill.svg";
import instagram from "./../components/icons/ri_instagram-fill.svg";
import youtube from "./../components/icons/mdi_youtube.svg";
import telephone from "./../components/icons/ic_baseline-phone.svg";
import email from "./../components/icons/email.svg";
import humo from "./../../public/images/humo.png";
import payme from "./../../public/images/payme.png";
import mastercard from "./../../public/images/masterkard-removebg-preview.png";
import uzcard from "./../../public/images/uzcard-removebg-preview.png";
import visa from "./../../public/images/visa.png";
import click from "./../../public/images/click.png";
import Forms from "./../pages/Forms";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <Forms />
      <footer id="footer" className="bg-[#191C1F] text-white py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-center sm:items-start">
            <Link href={'/'} >
              <Image src={OnePc} alt="logo" className="h-12" />
            </Link>
          
            <p className="text-[#77878F] mt-5">Ijtimoiy tarmoqlar</p>
            <div className="flex gap-4 mt-4 text-xl">
              <a href="#">
                <Image src={telegram} alt="telegram" className="h-8" />
              </a>
              <a href="#">
                <Image src={instagram} alt="instagram" className="h-8" />
              </a>
              <a href="#">
                <Image src={youtube} alt="youtube" className="h-8" />
              </a>
              <a href="#">
                <Image src={facebook} alt="facebook" className="h-8" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <p className="text-white font-medium mb-[18px] lg:ml-[-250px]">
              TO'LOV USULLARI
            </p>
            <div className="grid grid-cols-2 gap-3 lg:gap-4 w-fit mx-auto lg:ml-[-55px]">
              <div className="w-[150px] rounded-xl flex items-center justify-center h-[60px] bg-[#212427]">
                <Image src={uzcard} alt="uzcard" className="w-[30px]" />
              </div>
              <div className="w-[150px] rounded-xl flex items-center justify-center h-[60px] bg-[#212427]">
                <Image src={humo} alt="humo" className="w-[100px]" />
              </div>
              <div className="w-[150px] rounded-xl flex items-center justify-center h-[60px] bg-[#212427]">
                <Image src={click} alt="click" className="w-[100px]" />
              </div>
              <div className="w-[150px] rounded-xl flex items-center justify-center h-[60px] bg-[#212427]">
                <Image src={payme} alt="payme" className="w-[100px]" />
              </div>
              <div className="w-[150px] rounded-xl flex items-center justify-center h-[60px] bg-[#212427]">
                <Image src={visa} alt="visa" className="w-[100px]" />
              </div>
              <div className="w-[150px] rounded-xl flex items-center justify-center h-[60px] bg-[#212427]">
                <Image src={mastercard} alt="mastercard" className="w-[70px]" />
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium text-[#FFFFFF]">Bo'limlar</h3>
            <ul className="mt-4 mb-4 space-y-2 text-[#ADB7BC]">
              <li className="mb-1">
                <Link href="/" className="hover:text-red-700 transition">
                  Yetkazib berish
                </Link>
              </li>

              <li className="mb-1">
                <Link
                  href="/about-us"
                  className="hover:text-red-700 transition"
                >
                  Biz haqimizda
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/cart" className="hover:text-red-700 transition">
                  Savatcha
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  href="/favorites"
                  className="hover:text-red-700 transition"
                >
                  Sevimlilar
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/setup" className="hover:text-red-700 transition">
                  Kompyuter yig'ish
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium text-[#FFFFFF]">
              Biz bilan bog’lanish
            </h3>
            <div className="mt-4 space-y-2">
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start text-[#ADB7BC]"
              >
                <Image src={telephone} alt="phone" className="h-6" />
                <span className="ml-2 hover:text-red-700 transition">
                  +998 99 555 50 50
                </span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start text-[#ADB7BC]"
              >
                <Image src={telephone} alt="phone" className="h-6" />
                <span className="ml-2 hover:text-red-700 transition">
                  +998 99 555 50 50
                </span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start text-[#ADB7BC]"
              >
                <Image src={email} alt="email" className="h-6" />
                <span className="ml-2 hover:text-red-700 transition">
                  info@onepc.com
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 text-[#ADB7BC] pt-4">
          OnePC © 2025. Made by Repid agency
        </div>
      </footer>
    </div>
  );
}
