"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    need: "",
    location: "",
    budget: "",
    email: "",
  });

  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerLabelRef = useRef<HTMLParagraphElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headerLabel = headerLabelRef.current;
    const headerDesc = headerDescRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const line4 = line4Ref.current;
    const button = buttonRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states - all hidden
      gsap.set(headerLabel, { opacity: 0, y: 30 });
      gsap.set(headerDesc, { opacity: 0, y: 30 });
      gsap.set(line1, { opacity: 0, y: 40 });
      gsap.set(line2, { opacity: 0, y: 40 });
      gsap.set(line3, { opacity: 0, y: 40 });
      gsap.set(line4, { opacity: 0, y: 40 });
      gsap.set(button, { opacity: 0, scale: 0.8 });

      // Header label - "Contact us" - first to appear
      gsap.to(headerLabel, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Header description - with delay
      gsap.to(headerDesc, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Line 1: HELLO, MY NAME - staggered reveal
      gsap.to(line1, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Line 2: I NEED
      gsap.to(line2, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Line 3: PREFERRED LOCATION
      gsap.to(line3, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Line 4: MY BUDGET + MY EMAIL
      gsap.to(line4, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Submit button - last to appear with scale
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5F5F3]"
      style={{
        paddingLeft: "48px",
        paddingRight: "48px",
        paddingTop: "8vh",
        paddingBottom: "9vh",
        zIndex: 2,
      }}
    >
      {/* Header Row */}
      <div className="flex items-start" style={{ marginBottom: "12vh", gap: "6vw" }}>
        <p ref={headerLabelRef} className="text-sm font-semibold text-[#493425] leading-[140%]" style={{ opacity: 0 }}>
          Contact us
        </p>
        <p ref={headerDescRef} className="text-sm font-medium text-[#8D7660] leading-[170%]" style={{ opacity: 0 }}>
          Tell us what you&apos;re looking for
          <br />
          for we&apos;ll find properties
          <br />
          that match your vision
        </p>
      </div>

      {/* Conversational Form */}
      <form onSubmit={handleSubmit}>
        {/* Line 1: HELLO, MY NAME */}
        <div ref={line1Ref} className="flex items-baseline flex-wrap mb-10" style={{ gap: "16px", opacity: 0 }}>
          <span
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#493425]"
            style={{ letterSpacing: "-0.02em" }}
          >
            HELLO,
          </span>
          <span
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#493425]"
            style={{ letterSpacing: "-0.02em" }}
          >
            MY NAME
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="first name & last name"
            className="flex-1 min-w-[200px] bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
          />
        </div>

        {/* Line 2: I NEED */}
        <div ref={line2Ref} className="flex items-baseline flex-wrap mb-10" style={{ gap: "16px", opacity: 0 }}>
          <span
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#493425]"
            style={{ letterSpacing: "-0.02em" }}
          >
            I NEED
          </span>
          <input
            type="text"
            name="need"
            value={formData.need}
            onChange={handleChange}
            placeholder="a property that fits my lifestyle and investment goals"
            className="flex-1 min-w-[300px] bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
          />
        </div>

        {/* Line 3: PREFERRED LOCATION */}
        <div ref={line3Ref} className="flex items-baseline flex-wrap mb-10" style={{ gap: "16px", opacity: 0 }}>
          <span
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#8D7660]"
            style={{ letterSpacing: "-0.02em" }}
          >
            PREFERRED LOCATION
          </span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Palm Jumeirah, Downtown Dubai"
            className="flex-1 min-w-[250px] bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
          />
        </div>

        {/* Line 4: MY BUDGET + MY EMAIL + BUTTON */}
        <div ref={line4Ref} className="flex items-baseline flex-wrap" style={{ gap: "24px", opacity: 0 }}>
          <div className="flex items-baseline flex-wrap" style={{ gap: "16px" }}>
            <span
              className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#493425]"
              style={{ letterSpacing: "-0.02em" }}
            >
              MY BUDGET
            </span>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="$3 000 000 +"
              className="w-[140px] bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
            />
          </div>

          <div className="flex items-baseline flex-wrap" style={{ gap: "16px" }}>
            <span
              className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#8D7660]"
              style={{ letterSpacing: "-0.02em" }}
            >
              MY EMAIL
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-[200px] bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
            />
          </div>

          {/* Submit Button */}
          <button
            ref={buttonRef}
            type="submit"
            className="ml-auto w-[120px] h-[120px] rounded-full bg-[#BBA793] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center text-center leading-tight hover:bg-[#A69580] transition-colors"
            style={{ letterSpacing: "0.05em", opacity: 0 }}
          >
            SEND MY
            <br />
            REQUEST
          </button>
        </div>
      </form>
    </section>
  );
}
