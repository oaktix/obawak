"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { createInquiry } from "@/lib/db";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      await createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMessage("Failed to transmit message. Please verify network conditions.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* ------------------------------------------------------------- */}
      {/* HEADER HERO */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-20 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">CONTACT US</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Consult With Our Team
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about system designs, pricing rates, or emergency audits? Reach our administrative team.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CONTACT DATA & FORM GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Details & Visual Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-primary">Office Coordinates</h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                  Our headquarters are located in the heart of Lekki. Stop by our offices during operation hours or reach our 24/7 hotline.
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-primary/5 text-primary p-3 rounded-xl mr-4 shrink-0 shadow-sm border border-primary/5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Hotlines</span>
                    <span className="text-sm font-semibold text-primary block">+234 (803) 123-4567</span>
                    <span className="text-xs text-gray-500 font-light">Emergency Support: 24/7 Dispatch</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-primary/5 text-primary p-3 rounded-xl mr-4 shrink-0 shadow-sm border border-primary/5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Email Addresses</span>
                    <span className="text-sm font-semibold text-primary block">inquiries@obawakconsult.com</span>
                    <span className="text-xs text-gray-500 font-light">SLA Operations: support@obawakconsult.com</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-primary/5 text-primary p-3 rounded-xl mr-4 shrink-0 shadow-sm border border-primary/5">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Headquarters</span>
                    <span className="text-sm font-semibold text-primary block">12 Admiralty Way, Lekki Phase 1</span>
                    <span className="text-xs text-gray-500 font-light">Lagos State, Nigeria</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="bg-primary/5 text-primary p-3 rounded-xl mr-4 shrink-0 shadow-sm border border-primary/5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Operational Hours</span>
                    <span className="text-sm font-semibold text-primary block">Monday – Friday: 8:00 AM – 5:00 PM</span>
                    <span className="text-xs text-gray-500 font-light">Weekends: Pre-scheduled audits only</span>
                  </div>
                </div>
              </div>

              {/* Premium Geometric Map Mock */}
              <div className="relative h-64 bg-gradient-premium border border-accent/20 rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
                {/* Geometric lines imitating streets */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
                <div className="absolute h-full w-[2px] bg-accent/25 left-1/3 rotate-12"></div>
                <div className="absolute h-full w-[2px] bg-accent/25 left-2/3 -rotate-45"></div>
                <div className="absolute w-full h-[2px] bg-accent/25 top-1/4"></div>
                <div className="absolute w-full h-[2px] bg-accent/25 top-3/4"></div>
                
                {/* Floating GPS marker */}
                <div className="relative z-10 text-center space-y-2 animate-bounce">
                  <div className="bg-accent text-primary p-3 rounded-full shadow-2xl flex items-center justify-center border-4 border-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="bg-primary/95 text-white text-[10px] font-bold px-3 py-1 rounded-md border border-white/10 uppercase tracking-widest block shadow">
                    Obawak Lekki HQ
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Validated Contact Form */}
            <div className="lg:col-span-7 bg-gray-50 border border-gray-200/80 rounded-2xl p-8 sm:p-10 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">Inquiry Portal</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Complete the secure inquiry form below, and our engineering managers will coordinate response files within 24 operational hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Corporate Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Contact Telephone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Detailed Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Status Alerts */}
                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-4 rounded-lg flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-3 text-green-500 shrink-0" />
                      <div>
                        <strong className="font-bold">Transmission Successful!</strong> Your inquiry has been registered in our CMS inbox. An engineering associate will contact you.
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-lg flex items-start animate-pulse">
                      <AlertCircle className="h-5 w-5 mr-3 text-red-500 shrink-0" />
                      <div>
                        <strong className="font-bold">Inquiry Blocked:</strong> {errorMessage}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-md text-primary bg-accent hover:bg-accent-dark shadow transition-colors cursor-pointer"
                  >
                    {submitting ? (
                      <>Transmitting Inquiries...</>
                    ) : (
                      <>
                        Transmit Inquiry
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
