import Image from "next/image";
import OnePc from "./../../src/components/icons/One-pc-logo.svg";
import facebook from "./../components/icons/bi_facebook.svg";
import telegram from "./../components/icons/mingcute_telegram-fill.svg";
import instagram from "./../components/icons/ri_instagram-fill.svg";
import youtube from "./../components/icons/mdi_youtube.svg";
import telephone from "./../components/icons/ic_baseline-phone.svg";
import email from "./../components/icons/email.svg";
import Forms from "./../pages/Forms";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <Forms />
      <footer id="footer" className="bg-[#191C1F] text-white py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-center sm:items-start">
            <Image src={OnePc} alt="logo" className="h-12" />
            <p className="mt-5 text-gray-400 text-center sm:text-left">
              Yunusobod tumani, Kichik halqa yo'li 59
            </p>
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

          <div className="flex justify-center sm:justify-end ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.4788401980627!2d69.24007157640048!3d41.31233627126788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2254d2f0bf%3A0xfac56bcbf3dbf4c!2z0KLQsNCy0LvQtdC90LjQutC4INC_0YDQvtGB0L_QtdC60YIg0L_RgNC-0YHQv9C10LvRjA!5e0!3m2!1sru!2s!4v1644853316491!5m2!1sru!2s"
              width="100%"
              height="150"
              className="rounded-lg max-w-[300px] sm:max-w-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="text-center mt-12 text-[#ADB7BC] pt-4">
          OnePC © 2025. Made by Khamidullaev
        </div>
      </footer>
    </div>
  );
}
