"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      heading: "(FOR INVESTORS)",
      paragraph:
        "Clear numbers, measurable growth potential, and strategic advice from experienced analysts. We help you identify the most profitable assets, diversify your portfolio, and achieve sustainable capital growth",
      imageMarginLeft: "28vw",
      image: "/invest.jpg",
    },
    {
      heading: "(FOR THOSE ABROAD)",
      paragraph:
        "Full remote management and legal support from anywhere in the world. We take care of all the formalities — from document delivery to secure payments — so you can invest and own property with ease, wherever you are",
      imageMarginLeft: "0",
      image: "/abroad.jpg",
    },
    {
      heading: "(FOR PUBLIC FIGURES)",
      paragraph:
        "Discretion, confidentiality, and premium service 24/7. We understand the importance of privacy and provide tailored assistance that meets the highest standards of exclusivity and personal care",
      imageMarginLeft: "14vw",
      image: "/figures.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const serviceElements = serviceRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !title || !description) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(title, { opacity: 0, y: 50 });
      gsap.set(description, { opacity: 0, y: 50 });
      gsap.set(serviceElements, { opacity: 0, y: 60 });

      // Title animation - first to appear
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Description - after title
      gsap.to(description, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Service rows - staggered reveal one by one
      serviceElements.forEach((service, index) => {
        gsap.to(service, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3 + index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Handle hover animations for images
  const handleMouseEnter = (index: number) => {
    const imageEl = imageRefs.current[index];
    if (imageEl) {
      gsap.to(imageEl, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const imageEl = imageRefs.current[index];
    if (imageEl) {
      gsap.to(imageEl, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] w-full"
      style={{
        paddingLeft: "48px",
        paddingRight: "48px",
        paddingTop: "14vh",
        paddingBottom: "14vh",
        zIndex: 2,
      }}
    >
      {/* Service Rows */}
      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            serviceRefs.current[index] = el;
          }}
          style={{ opacity: 0 }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {/* Divider - not before first row */}
          {index > 0 && (
            <div
              className="w-full bg-[#493425]/15"
              style={{
                height: "1px",
                marginTop: "7vh",
                marginBottom: "7vh",
              }}
            />
          )}

          {/* Service Row - Image on left side, Text on right side */}
          <div className="flex relative cursor-pointer group">
            {/* Left Side - Intro text for first row, Image for others */}
            <div className="w-1/2">
              {index === 0 ? (
                /* First row: Intro text + Image */
                <div className="flex items-start" style={{ gap: "6vw" }}>
                  {/* Intro Text */}
                  <div className="shrink-0">
                    <h2
                      ref={titleRef}
                      className="text-sm font-semibold text-[#493425] leading-[140%]"
                      style={{ opacity: 0 }}
                    >
                      We know what you
                      <br />
                      prioritize
                    </h2>
                  </div>
                  <p
                    ref={descriptionRef}
                    className="text-sm font-medium text-[#8D7660] leading-[160%]"
                    style={{ maxWidth: "165px", opacity: 0 }}
                  >
                    Our approach is built on trust, transparency, and long-term value —
                    ensuring every client feels confident at every stage of their real
                    estate journey
                  </p>
                  {/* Image Placeholder - shows on hover */}
                  <div
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="bg-[#E5E2DD] shrink-0 overflow-hidden relative"
                    style={{
                      width: "130px",
                      height: "130px",
                      opacity: 0,
                      transform: "scale(0.95)",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                /* Other rows: Just Image with staggered position */
                <div style={{ paddingLeft: service.imageMarginLeft }}>
                  <div
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="bg-[#E5E2DD] overflow-hidden relative"
                    style={{
                      width: "130px",
                      height: "130px",
                      opacity: 0,
                      transform: "scale(0.95)",
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Heading + Paragraph */}
            <div className="w-1/2" style={{ paddingLeft: "8vw" }}>
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#493425] tracking-tight leading-[110%] transition-colors duration-300 group-hover:text-[#8D7660]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {service.heading}
              </h3>
              <p
                className="text-sm font-medium text-[#8D7660] leading-[170%] mt-6 transition-colors duration-300 group-hover:text-[#493425]"
                style={{ maxWidth: "380px" }}
              >
                {service.paragraph}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Divider */}
      <div
        className="w-full bg-[#493425]/15"
        style={{
          height: "1px",
          marginTop: "7vh",
        }}
      />
    </section>
  );
}
