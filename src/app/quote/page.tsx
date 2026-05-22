"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, 
  Shield, 
  Network, 
  Sun, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  AlertCircle,
  Building2, 
  Home, 
  Factory,
  HelpCircle
} from "lucide-react";
import { createQuoteRequest } from "@/lib/db";

const availableServices = [
  { title: "Electrical Engineering & Installations", slug: "electrical-installations", icon: Zap },
  { title: "Intelligent Security & Surveillance", slug: "smart-security-systems", icon: Shield },
  { title: "Network Infrastructure & Cabling", slug: "network-structured-cabling", icon: Network },
  { title: "Smart Solar & Energy Solutions", slug: "solar-energy-systems", icon: Sun },
];

export default function QuoteWizardPage() {
  // Step tracker
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    selectedServices: [] as string[],
    projectScale: "" as "residential" | "commercial" | "industrial" | "",
    timeline: "",
    budget: "",
    description: "",
    honeypot: "", // Spam blocking honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleServiceToggle = (title: string) => {
    setFormData((prev) => {
      const selected = prev.selectedServices.includes(title)
        ? prev.selectedServices.filter((s) => s !== title)
        : [...prev.selectedServices, title];
      return { ...prev, selectedServices: selected };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (formData.selectedServices.length === 0) {
        setErrorText("Please select at least one capability area.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.projectScale) {
        setErrorText("Please select a project scale coordinate.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.budget || !formData.timeline) {
        setErrorText("Please define both budget and timeline bounds.");
        return false;
      }
    }
    if (step === 4) {
      if (!formData.name || !formData.email || !formData.phone) {
        setErrorText("Please complete all required contact credentials.");
        return false;
      }
      // Simple email validation
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorText("Please supply a valid corporate email.");
        return false;
      }
    }
    setErrorText("");
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorText("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check
    if (formData.honeypot) {
      // Silently fail to spam bots
      setSubmitSuccess(true);
      return;
    }

    if (!validateStep()) return;

    setSubmitting(true);
    try {
      await createQuoteRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        services: formData.selectedServices,
        project_scale: formData.projectScale as "residential" | "commercial" | "industrial",
        timeline: formData.timeline,
        budget: formData.budget,
        description: formData.description,
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorText("Failed to transmit quote parameters. Please verify connections.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-[80vh]">
      {/* ------------------------------------------------------------- */}
      {/* HEADER TITLE */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-premium text-white py-12 relative overflow-hidden border-b border-accent/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-accent uppercase">INTERACTIVE CALCULATOR</span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Engineering Scope Planner
          </h1>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WIZARD CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {submitSuccess ? (
            /* SUCCESS PANEL */
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-sm animate-fade-in">
              <div className="bg-green-50 text-green-500 p-4 rounded-full w-fit mx-auto border border-green-100 shadow-inner">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary">Quote Parameters Transmitted</h2>
              <p className="text-sm text-gray-500 leading-relaxed font-light max-w-md mx-auto">
                Thank you, <strong className="font-semibold text-primary">{formData.name}</strong>. Your engineering scope configurations have been registered in our CMS. A technical estimator will compile a conceptual proposal and coordinate.
              </p>
              <div className="pt-4 flex justify-center space-x-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-xs font-semibold rounded-md text-white bg-primary hover:bg-primary-dark shadow"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-200 text-xs font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Review Capabilities
                </Link>
              </div>
            </div>
          ) : (
            /* WIZARD CORE FORM */
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
              
              {/* Progress Steps Indicators */}
              <div className="flex items-center justify-between border-b border-gray-200/80 pb-6 text-xs text-gray-400 font-mono">
                <span className={step >= 1 ? "text-accent font-bold" : ""}>01. SERVICES</span>
                <span className="text-gray-300">/</span>
                <span className={step >= 2 ? "text-accent font-bold" : ""}>02. SCALE</span>
                <span className="text-gray-300">/</span>
                <span className={step >= 3 ? "text-accent font-bold" : ""}>03. BOUNDS</span>
                <span className="text-gray-300">/</span>
                <span className={step >= 4 ? "text-accent font-bold" : ""}>04. CONFIRM</span>
              </div>

              {/* Error messages */}
              {errorText && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-lg flex items-center animate-pulse">
                  <AlertCircle className="h-5 w-5 mr-3 text-red-500 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot hidden field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* ------------------------------------------------------------- */}
                {/* STEP 1: SERVICE CHOICE */}
                {/* ------------------------------------------------------------- */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg font-bold text-primary">Which infrastructure capabilities are required?</h3>
                      <p className="text-xs text-gray-500 font-light">Select all areas that apply to your current build cycle.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {availableServices.map((srv) => {
                        const isSelected = formData.selectedServices.includes(srv.title);
                        const SrvIcon = srv.icon;
                        return (
                          <div
                            key={srv.slug}
                            onClick={() => handleServiceToggle(srv.title)}
                            className={`border rounded-xl p-5 cursor-pointer transition-all flex items-start space-x-4 relative ${
                              isSelected
                                ? "bg-primary border-primary text-white shadow-md"
                                : "bg-white border-gray-200 text-primary hover:border-accent hover:shadow-sm"
                            }`}
                          >
                            <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? 'bg-accent text-primary' : 'bg-primary/5 text-primary'}`}>
                              <SrvIcon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold leading-tight">{srv.title}</h4>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-accent text-primary p-0.5 rounded-full">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* STEP 2: PROJECT SCALE */}
                {/* ------------------------------------------------------------- */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg font-bold text-primary">Define the project scale & scope</h3>
                      <p className="text-xs text-gray-500 font-light">Select physical classification and describe specific technical needs.</p>
                    </div>

                    {/* Scale Selector */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Residential */}
                      <div
                        onClick={() => setFormData((prev) => ({ ...prev, projectScale: "residential" }))}
                        className={`border rounded-xl p-5 cursor-pointer text-center space-y-3 transition-all ${
                          formData.projectScale === "residential"
                            ? "bg-primary border-primary text-white shadow-md"
                            : "bg-white border-gray-200 text-primary hover:border-accent hover:shadow-sm"
                        }`}
                      >
                        <Home className="h-6 w-6 mx-auto text-accent" />
                        <span className="text-[10px] font-bold block uppercase tracking-wider">Residential</span>
                      </div>

                      {/* Commercial */}
                      <div
                        onClick={() => setFormData((prev) => ({ ...prev, projectScale: "commercial" }))}
                        className={`border rounded-xl p-5 cursor-pointer text-center space-y-3 transition-all ${
                          formData.projectScale === "commercial"
                            ? "bg-primary border-primary text-white shadow-md"
                            : "bg-white border-gray-200 text-primary hover:border-accent hover:shadow-sm"
                        }`}
                      >
                        <Building2 className="h-6 w-6 mx-auto text-accent" />
                        <span className="text-[10px] font-bold block uppercase tracking-wider">Commercial</span>
                      </div>

                      {/* Industrial */}
                      <div
                        onClick={() => setFormData((prev) => ({ ...prev, projectScale: "industrial" }))}
                        className={`border rounded-xl p-5 cursor-pointer text-center space-y-3 transition-all ${
                          formData.projectScale === "industrial"
                            ? "bg-primary border-primary text-white shadow-md"
                            : "bg-white border-gray-200 text-primary hover:border-accent hover:shadow-sm"
                        }`}
                      >
                        <Factory className="h-6 w-6 mx-auto text-accent" />
                        <span className="text-[10px] font-bold block uppercase tracking-wider">Industrial</span>
                      </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Scope Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        placeholder="Detail load parameters, node counts, structural dimensions, or other details..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary resize-none"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* STEP 3: BOUNDS (BUDGET & TIMELINE) */}
                {/* ------------------------------------------------------------- */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg font-bold text-primary">Define project boundaries</h3>
                      <p className="text-xs text-gray-500 font-light">Outline target execution bounds and budget parameters.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Budget */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                          Estimated Budget Limits
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary cursor-pointer font-medium text-primary"
                        >
                          <option value="">Select Budget Bounds...</option>
                          <option value="< $5k">Micro Scale (&lt; $5,000)</option>
                          <option value="$5k - $20k">Medium Scale ($5,000 - $20,000)</option>
                          <option value="$20k+">Enterprise Scale ($20,000+)</option>
                        </select>
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                          Desired Launch Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary cursor-pointer font-medium text-primary"
                        >
                          <option value="">Select Timeline bounds...</option>
                          <option value="immediate">Immediate Dispatch</option>
                          <option value="1-3 months">1 to 3 Months</option>
                          <option value="flexible">Flexible / Planning stage</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* STEP 4: CONTACT & SUMMARY PREVIEW */}
                {/* ------------------------------------------------------------- */}
                {step === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg font-bold text-primary">Coordinate credentials</h3>
                      <p className="text-xs text-gray-500 font-light">Supply official contact channels to receive the engineering assessment report.</p>
                    </div>

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
                          Contact Telephone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Corporate / Entity Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Summary Preview Box */}
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 space-y-3.5 text-xs text-primary/80 font-medium">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent border-b border-primary/10 pb-1.5">
                        SCOPE SPECIFICATIONS SUMMARY
                      </h4>
                      <div className="space-y-1.5">
                        <p><strong>Selected Systems:</strong> {formData.selectedServices.join(", ")}</p>
                        <p><strong>Project Classification:</strong> <span className="capitalize">{formData.projectScale}</span></p>
                        <p><strong>Proposed Budget:</strong> {formData.budget}</p>
                        <p><strong>Timeline Constraint:</strong> <span className="capitalize">{formData.timeline}</span></p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* WIZARD ACTIONS */}
                {/* ------------------------------------------------------------- */}
                <div className="pt-6 border-t border-gray-200/80 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 text-xs font-semibold rounded-md text-gray-600 bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-xs font-bold rounded-md text-white bg-primary hover:bg-primary-dark shadow cursor-pointer"
                    >
                      Proceed <ArrowRight className="ml-1.5 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-primary bg-accent hover:bg-accent-dark shadow cursor-pointer"
                    >
                      {submitting ? (
                        <>Transmitting...</>
                      ) : (
                        <>
                          Transmit Specifications
                          <Check className="ml-1.5 h-4 w-4 animate-bounce" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
