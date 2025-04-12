"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    if (response.ok) {
      alert("Muvaffaqiyatli yuborildi!");
      setName("");
      setPhone("");
    } else {
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-col justify-center items-center h-full bg-[#191C1F] text-center">
      <div className="flex flex-col-reverse lg:flex-col items-center w-full max-w-[572px]">
        <h2 className="font-semibold text-4xl mt-4 text-white mb-1 py-4">
          Biz bilan bog’lanish
        </h2>
        <p className="text-gray-400 text-sm mb-2.5 mt-2.5">
          Sizni qiziqtirgan savollaringizga javob olish uchun quyidagi shaklni{" "}
          <br />
          to’ldiring, operatorlarimiz siz bilan bog’lanishadi.
        </p>

        <form
          className="space-y-4 py-4 w-full max-w-[500px] flex flex-col items-center lg:items-start"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full gap-4">
            <input
              type="text"
              placeholder="Ismingizni kiriting"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/2 h-12 px-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              placeholder="+998 99 555 25 25"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-1/2 h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-[#FF0000] hover:bg-red-700 transition-all text-white rounded-md font-semibold flex items-center justify-center gap-2"
          >
            Yuborish <span className="ml-2">➡</span>
          </button>
        </form>
      </div>
    </div>
  );
}
