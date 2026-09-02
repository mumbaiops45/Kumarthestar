"use client";

import { useState } from "react";
import { Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { contact, whatsappLink } from "../../data/site";

const WhatsApp = () => {
  const [callOpen, setCallOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {callOpen && (
        <div className="mb-1 w-60 overflow-hidden rounded-2xl border border-[#0B1E3D]/10 bg-white shadow-[0_20px_50px_rgba(11,30,61,0.22)]">
          <p className="border-b border-[#0B1E3D]/8 bg-[#F7F3EA] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#B26E02]">
            Call us directly
          </p>
          {contact.phones.map((phone) => (
            <a
              key={phone.raw}
              href={"tel:+" + phone.raw}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#0B1E3D] transition-colors hover:bg-[#F0B429]/10 hover:text-[#804501]"
            >
              <Phone className="h-3.5 w-3.5 text-[#B26E02]" />
              {phone.label}
            </a>
          ))}
        </div>
      )}

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={28} />
      </a>

      <button
        type="button"
        onClick={() => setCallOpen((open) => !open)}
        aria-expanded={callOpen}
        aria-label={callOpen ? "Hide phone numbers" : "Show phone numbers"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0B1E3D] to-[#112448] text-[#FDD34F] shadow-[0_10px_28px_rgba(11,30,61,0.35)] ring-1 ring-[#F0B429]/30 transition-all duration-300 hover:scale-110 hover:ring-[#F0B429]/70"
      >
        {callOpen ? <X size={24} /> : <Phone size={24} strokeWidth={2} />}
      </button>
    </div>
  );
};

export default WhatsApp;
