"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
    const phoneNumber = "9876543421";

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
            >
                <FaWhatsapp size={28} />
            </a>
            <a
                href={`tel:+${phoneNumber}`}
                aria-label="Call us"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600"
            >
                <Phone size={26} strokeWidth={2} />
            </a>

        </div>
    );
};

export default WhatsApp;
