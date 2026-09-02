"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {AlertCircle,ArrowRight,CheckCircle2,ChevronDown,Loader2,Search,Zap} from "lucide-react";
import axios from "axios";
import { divisions, categoryTheme } from "../../data/divisions";
import { formEndpoint } from "../../data/site";


const serviceOptions = divisions.map((d) => ({
  value: d.title,
  category: d.category,
  categoryLabel: categoryTheme[d.category]?.label ?? "Other",
  icon: d.icon,
}));

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const inputClass =
  "w-full bg-[#FAFAF8] border border-[#0B1E3D]/12 rounded-2xl px-5 py-3.5 text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429] focus:bg-white transition-all hover:border-[#F0B429]/50";

const labelClass =
  "block text-xs font-bold text-[#B26E02] uppercase tracking-widest";

const ContactForm = () => {
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  // "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredServices = useMemo(() => {
    const query = serviceSearch.trim().toLowerCase();
    if (!query) return serviceOptions;
    return serviceOptions.filter(
      (option) =>
        option.value.toLowerCase().includes(query) ||
        option.categoryLabel.toLowerCase().includes(query)
    );
  }, [serviceSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot: real people leave this hidden field empty.
    if (e.target.company?.value) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      await axios.post(
        formEndpoint,
        {
          _subject: `New enquiry: ${formData.service || "General"}`,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || "Not specified",
          message: formData.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setStatus("success");
      setFormData(emptyForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message ??
          "We could not send that just now. Please call us instead — the numbers are alongside this form."
      );
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#F0B429]/40 via-[#804501]/25 to-[#F0B429]/40 blur-sm" />

        <div className="relative rounded-3xl border border-[#F0B429]/20 bg-white p-8 shadow-[0_30px_80px_rgba(11,30,61,0.14)] md:p-12">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="py-10 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 ring-1 ring-emerald-500/35"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </motion.span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                  Enquiry received.
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  Thank you. We have your details and will call you back within
                  24 hours on the number you shared.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-7 rounded-2xl border border-[#0B1E3D]/10 bg-[#FAFAF8] px-7 py-3 text-sm font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/50 hover:bg-[#F0B429]/10 hover:text-[#804501]"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate={false}
              >
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className={labelClass}>
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className={labelClass}>
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 90000 00000"
                      className={inputClass}
                    />
                  </div>
                  <div className="relative space-y-2">
                    <label htmlFor="service" className={labelClass}>
                      Which service?
                    </label>
                    <button
                      type="button"
                      id="service"
                      aria-haspopup="listbox"
                      aria-expanded={isServiceDropdownOpen}
                      onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
                      className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#0B1E3D]/12 bg-[#FAFAF8] px-5 py-3.5 text-left text-[#0B1E3D] transition-all hover:border-[#F0B429]/50"
                    >
                      <span
                        className={
                          formData.service
                            ? "truncate text-[#0B1E3D]"
                            : "text-slate-400"
                        }
                      >
                        {formData.service || "Select a service"}
                      </span>
                      <ChevronDown
                        className={`ml-2 h-4 w-4 flex-shrink-0 text-[#804501] transition-transform ${
                          isServiceDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isServiceDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#F0B429]/30 bg-white shadow-[0_20px_60px_rgba(11,30,61,0.18)]"
                        >
                          <div className="sticky top-0 border-b border-[#0B1E3D]/8 bg-white p-3">
                            <div className="flex items-center gap-2 rounded-xl border border-[#0B1E3D]/10 bg-[#FAFAF8] px-3 py-2">
                              <Search className="h-4 w-4 text-[#B26E02]" />
                              <input
                                type="text"
                                value={serviceSearch}
                                onChange={(e) => setServiceSearch(e.target.value)}
                                placeholder="Search all services..."
                                className="w-full border-none bg-transparent text-sm text-[#0B1E3D] outline-none placeholder-slate-400"
                              />
                            </div>
                          </div>
                          <div className="max-h-56 overflow-y-auto p-2" role="listbox">
                            {filteredServices.length > 0 ? (
                              filteredServices.map((option) => (
                                <button
                                  type="button"
                                  key={option.value}
                                  role="option"
                                  aria-selected={formData.service === option.value}
                                  onClick={() => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      service: option.value,
                                    }));
                                    setIsServiceDropdownOpen(false);
                                    setServiceSearch("");
                                  }}
                                  className="flex w-full cursor-pointer items-start gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-[#F7F3EA] hover:text-[#804501]"
                                >
                                  <option.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F0B429]" />
                                  <span>
                                    {option.value}
                                    <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                      {option.categoryLabel}
                                    </span>
                                  </span>
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-4 text-center text-sm text-slate-400">
                                No matching service found.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you need in a line or two - the grade and exam, the quantity, the date, or the role you are hiring for."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  {status === "error" && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 md:col-span-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                      <p className="text-sm leading-6 text-red-700">{errorMessage}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={
                        status === "submitting"
                          ? undefined
                          : { scale: 1.02, boxShadow: "0 20px 60px rgba(240,180,41,0.4)" }
                      }
                      whileTap={status === "submitting" ? undefined : { scale: 0.98 }}
                      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] via-[#FDD34F] to-[#F0B429] py-4 text-base font-black text-[#06142D] shadow-[0_12px_40px_rgba(240,180,41,0.3)] transition-all disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="absolute inset-0 translate-x-[-100%] skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-[100%]" />
                      <span className="relative flex items-center gap-2">
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending your enquiry...
                          </>
                        ) : (
                          <>
                            <Zap className="h-5 w-5" />
                            Send Enquiry - Get a Call in 24 Hours
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </motion.button>
                    <p className="mt-3 text-center text-xs font-medium text-slate-400">
                      No spam and no hard-sell. Just an honest conversation about
                      what you need.
                    </p>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
