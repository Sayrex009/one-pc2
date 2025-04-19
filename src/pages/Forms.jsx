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
<<<<<<< HEAD
    <div className="flex justify-center items-center h-full bg-[#191C1F] text-center py-8 px-4">
      <div className="w-full max-w-[572px]">
        <h2 className="font-semibold text-3xl lg:text-4xl text-white mb-4">
          Biz bilan bog'lanish
        </h2>
        
        <p className="text-gray-400 text-sm lg:text-base mb-6 px-4 lg:px-0">
          Sizni qiziqtirgan savollaringizga javob olish uchun quyidagi shaklni 
          <span className="hidden lg:inline"><br /></span> to'ldiring, operatorlarimiz siz bilan bog'lanishadi.
        </p>

        <form
          className="space-y-4 w-full max-w-[500px] mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row w-full gap-4">
=======
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
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
            <input
              type="text"
              placeholder="Ismingizni kiriting"
              value={name}
              onChange={(e) => setName(e.target.value)}
<<<<<<< HEAD
              className="w-full lg:w-1/2 h-12 px-4 rounded-[1px] border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
=======
              className="w-1/2 h-12 px-4 rounded-[1px] border focus:outline-none focus:ring-2 focus:ring-red-500"
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
            />
            <input
              type="tel"
              placeholder="+998 99 555 25 25"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
<<<<<<< HEAD
              className="w-full lg:w-1/2 h-12 px-4 rounded-[1px] border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          
=======
              className="w-1/2 h-12 px-4 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
          <button
            type="submit"
            className="w-full h-12 bg-[#FF0000] hover:bg-red-700 transition-all text-white rounded-[1px] font-semibold flex items-center justify-center gap-2"
          >
            Yuborish <span className="ml-2">➡</span>
          </button>
        </form>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> aa0b3e2b54eeaf571a6dae4d4e7f11bb82b840d3
