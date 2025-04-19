"use client";
import { useState } from "react";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";

const locations = [
  {
    name: "ONEPC Yunusobod",
    address: "Toshkent shahar, Shayxontohur tumani, Qaratosh 11A",
    time: "09:00 - 21:00",
    phone: "+998 99 550 15 55",
  },
  {
    name: "ONEPC Chilonzor",
    address: "Toshkent shahar, Shayxontohur tumani, Qaratosh 11A",
    time: "09:00 - 21:00",
    phone: "+998 99 550 15 55",
  },
  {
    name: "ONEPC Mirzo-Ulugbek",
    address: "Toshkent shahar, Shayxontohur tumani, Qaratosh 11A",
    time: "09:00 - 21:00",
    phone: "+998 99 550 15 55",
  },
];

export default function LocationsPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-[1320px] w-full mx-auto px-4 gap-6 py-6">
        {/* Список филиалов */}
        <div className="w-full lg:w-[800] md:w-1/3 flex flex-col gap-4">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="p-[24px] shadow-md rounded-md bg-[#F7F7F7] border-[#DFDEE2] border-2 hover:bg-red-50 hover:border-[#FF0000] flex flex-row items-start gap-4"
            >
              {/* Иконка местоположения */}
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="mt-1"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>

              {/* Текст */}
              <div>
                <h2 className="text-[18px] font-semibold mb-[8px]">
                  {loc.name}
                </h2>
                <p className="text-[#ADB7BC] text-[14px] font-normal mb-[15px]">
                  {loc.address}
                </p>
                <div className="flex md:flex-row flex-col gap-[25px]">
                  <p>🕒 {loc.time}</p>
                  <p>📞 {loc.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Карта */}
        <div className="w-[800px] lg:ml-8 h-[600] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95843.32232660362!2d69.17079179999999!3d41.2994958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5d5eae8b4d5%3A0x9a01f3e50f42b9e1!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1711033445123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
