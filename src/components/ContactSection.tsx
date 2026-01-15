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
      id="contact-section"
      ref={sectionRef}
      className="relative w-full bg-[#F5F5F3] px-5 md:px-12 py-16 md:py-[8vh]"
      style={{
        zIndex: 2,
      }}
    >
      {/* Header Row */}
      <div className="flex flex-row items-start gap-6 md:gap-[6vw] mb-12 md:mb-[12vh]">
        <p ref={headerLabelRef} className="text-sm font-semibold text-[#493425] leading-[140%] shrink-0" style={{ opacity: 0 }}>
          Contact us
        </p>
        <p ref={headerDescRef} className="text-sm font-medium text-[#8D7660] leading-[170%]" style={{ opacity: 0 }}>
          Tell us what you&apos;re looking for
          <br />
          we&apos;ll find properties
          <br />
          that match your vision
        </p>
      </div>

      {/* Conversational Form - Single container with uniform gap */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-8">
        {/* Line 1: HELLO, MY NAME + input inline */}
        <div ref={line1Ref} className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4" style={{ opacity: 0 }}>
          <span
            className="text-2xl md:text-5xl lg:text-6xl font-normal text-[#493425] shrink-0 whitespace-nowrap"
            style={{ letterSpacing: "-0.02em" }}
          >
            HELLO, MY NAME
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="first name & last name"
            className="flex-1 bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
          />
        </div>

        {/* Line 2: I NEED + input inline */}
        <div ref={line2Ref} className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4" style={{ opacity: 0 }}>
          <span
            className="text-2xl md:text-5xl lg:text-6xl font-normal text-[#493425] shrink-0 whitespace-nowrap"
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
            className="flex-1 bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
          />
        </div>

        {/* Line 3: PREFERRED LOCATION + input inline */}
        <div ref={line3Ref} className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4" style={{ opacity: 0 }}>
          <span
            className="text-2xl md:text-5xl lg:text-6xl font-normal text-[#493425] shrink-0 whitespace-nowrap"
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
            className="flex-1 bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
          />
        </div>

        {/* Line 4: MY BUDGET + MY EMAIL + Submit Button inline */}
        <div ref={line4Ref} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 -mt-4 md:mt-0" style={{ opacity: 0 }}>
          {/* MY BUDGET */}
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
            <span
              className="text-2xl md:text-5xl lg:text-6xl font-normal text-[#493425] shrink-0 whitespace-nowrap"
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
              className="w-full md:w-[140px] bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
            />
          </div>

          {/* MY EMAIL */}
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 flex-1 mt-2 md:mt-0">
            <span
              className="text-2xl md:text-5xl lg:text-6xl font-normal text-[#8D7660] shrink-0 whitespace-nowrap"
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
              className="flex-1 bg-transparent border-0 border-b border-[#BBA793] text-sm font-medium text-[#493425] placeholder:text-[#BBA793] focus:outline-none focus:border-[#493425] transition-colors pb-2"
            />
          </div>

          {/* Submit Button */}
          <button
            ref={buttonRef}
            type="submit"
            className="mt-8 md:mt-0 w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full bg-[#BBA793] text-white text-[8px] md:text-[10px] font-bold uppercase flex items-center justify-center text-center leading-none hover:bg-[#A69580] transition-colors shrink-0 self-center md:self-end p-0"
            style={{ letterSpacing: "0.02em", opacity: 0 }}
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
